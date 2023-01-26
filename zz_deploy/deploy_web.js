// import { Client } from 'ssh2';
// import chalk from 'chalk';
// import ora from 'ora';
// import path from 'path'
// import { Client as scpClient } from 'node-scp';
// import { SERVER_CONFIG } from "./config.js";
// import { exec } from 'child_process'; 
// import { spawn,execSync } from 'child_process'; 
const { Client } = require('ssh2');
const chalk = require('chalk');
// import chalk from 'chalk';
const ora = require('ora');
const path = require('path')
const { SERVER_CONFIG } = require("./config.js");
const server = SERVER_CONFIG.web;
const scpClient = require('node-scp').Client;
const { exec } = require('child_process'); 
const { spawn,execSync } = require('child_process'); 
const spinner = ora('正在发布到服务器上...');
const source_path = server.localFolder;
const conn = new Client();

function deployFile() {
    let compress =`tar -zcvf ${server.rootFolder}.tar.gz ${source_path}/* `
    // let compress =`tar -zcvf /home/spike/project/myown/GoldDigger/web/dist.tar.gz ${source_path} `
    try {
        console.log(chalk.green('正在压缩文件......'));
        const output = execSync(compress, {
            cwd: '.',
            // encoding: 'utf8',
          })
        //   process.stdout.write(output)//输出进度，列表，没必要
        let { path , rootPath , rootFolder } = server ;
    //旧的服务端压缩包
    let rmzip = `rm -rf ${rootPath}${server.rootFolder}.tar.gz`
    let rmOld = `rm -rf ${path} && ${rmzip}`;
    let untar = `tar -xzvf ${rootPath}${server.rootFolder}.tar.gz -C ${rootPath}`
    conn.on('ready', ()=>{
        console.log('服务器连接完成');
        conn.exec(rmOld,(err, stream)=>{
                console.log(chalk.green('已删除旧文件...'));
                console.log(chalk.yellow(rmOld));
                if (err) {
                    conn.end()
                    throw err
                };
                stream.on('close', function (code, signal) {
                    spinner.start();
                    scpClient({
                        host: server.host,
                        port: server.port,
                        username: server.username,
                        password: server.password,
                    }).then(client => {
                        client.uploadFile(`${server.rootFolder}.tar.gz`, `${server.rootPath}${server.rootFolder}.tar.gz`)
                              .then(response => {
                                console.log(chalk.green('\n压缩包已上传到' + server.host + '服务器! \n'));
                                console.log(chalk.green('正在解压.... \n'));
                                console.log(chalk.green(untar));
                                
                                conn.exec(untar,(err2, stream2)=>{
                                    if (err2) throw err;
                                    stream2.on('close', function (code1, signal1) {
                                        // console.log(code1,signal1);
                                        conn.end();
                                        if(code1==0){
                                            console.log(chalk.green('Success! 已成功部署到'+path+'\n'));
                                        }else{
                                            console.log(chalk.red('Fail! 发布失败.\n'));
                                        }
                                    }).on('data', (data2) => {
                                        // console.log('STDOUT: ' + data2);
                                    }).stderr.on('data', (data2) => {
                                        console.log('STDERR: ' + data2);
                                    })
                                })
                                client.close() // remember to close connection after you finish
                                spinner.stop();
                                return
                              })
                              .catch(error => {
                                console.log(chalk.red('Fail! 发布失败.\n'));
                                console.log(chalk.red(error));
                                throw error;
                                spinner.stop();
                              })
                      }).catch(e => {
                        console.log(chalk.red('Fail! scp连接失败.\n'));
                        spinner.stop();
                        throw e;
                    })
                    
                }).on('data', (data) => {
                    console.log('STDOUT: ' + data);
                  }).stderr.on('data', (data) => {
                    console.log('STDERR: ' + data);
                  })
            });
    })
    .on('error', function (err) {
        console.log(chalk.red('Fail! 服务器连接失败.\n'));
        throw err;
    })
    .connect({
        host: server.host,
        port: server.port,
        username: server.username,
        password: server.password
    });
        
    } catch (error) {
        console.log(Chalk.red('压缩文件出错！'));
        return
    }
    
}
deployFile();