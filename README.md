# clinical_record_nodejs_demo
set up procedure:
1. log in mysql as root user
2. run database-setup.sql
3. run prepare-data.sql
4. configure environment variables in Dockerfile
5. run "docker build -t clinical_record_nodejs_demo <project_dir>"
6. start the server "docker run --name clinical_record_demo -p <host_port>:<guest_port> clinical_record_nodejs_demo"

test account:
email: email@123.com
password: password