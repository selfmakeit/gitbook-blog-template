import { Client } from 'ssh2';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path'
import { SERVER_CONFIG } from "./config.js";
const server = SERVER_CONFIG.prod;
import { Client as scpClient } from 'node-scp';
import { exec } from 'child_process'; 
import { spawn,execSync } from 'child_process'; 

const spinner = ora('正在发布到服务器上...');
const source_path ='../dist'
// import { Client as scpClient} from 'scp2';
const conn = new Client();

function deployFile() {
    let compress =`tar -zcvf ../dist.tar.gz ${source_path} `
    try {
        console.log(chalk.green('正在压缩文件......'));
        const output = execSync(compress, {
            cwd: '.',
            // encoding: 'utf8',
          })
        //   process.stdout.write(output)//输出进度，列表，没必要
        let { path , rootPath , rootFolder } = server ;
    let currentTime = new Date().toLocaleDateString();
    let rmzip = `rm -rf ${rootPath}/dist.tar.gz`
    let backup =`mkdir -p _backUp/${rootFolder}_${currentTime} && cp -r ${path} ${rootPath}_backUp/${rootFolder}_${currentTime}/`
    let backupCmd = `cd ${rootPath} && ${backup} && rm -rf ${path} && ${rmzip}`;
    let untar = `tar -xzvf ${rootPath}//dist.tar.gz`
    conn.on('ready', ()=>{
        console.log('服务器已连接');
        conn.exec(backupCmd,(err, stream)=>{
                console.log(chalk.green('已执行命令行'));
                console.log(chalk.yellow(backupCmd));
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
                        client.uploadFile('../dist.tar.gz', `${server.rootPath}/dist.tar.gz`)
                              .then(response => {
                                console.log(chalk.green('压缩包上传到服务器' + server.host + '服务器! \n'));
                                console.log(chalk.green('正在解压.... \n'));
                                conn.exec(untar,(err, stream)=>{
                                    if (err) throw err;
                                    stream.on('close', function (code, signal) {

                                    }).on('data', (data) => {
                                        console.log('STDOUT: ' + data);
                                    }).stderr.on('data', (data) => {
                                        console.log('STDERR: ' + data);
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

                    conn.end();
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
        console.log(chalk.red('压缩文件出错！'));
        return
    }
    
}
deployFile();