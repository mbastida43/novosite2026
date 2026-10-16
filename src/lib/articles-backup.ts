// Second article supplied by Marlon Bastida (original English + Portuguese translation).
import type { Article, ArticleBlock } from './articles'

const c = (code: string): ArticleBlock => ({ type: 'code', code: code.replace(/^\n|\n$/g, '') })

const code = {
  install: String.raw`sudo apt update
sudo apt install awscli -y`,
  configure: 'aws configure',
  create: 'aws s3api create-bucket --bucket my-secure-backup --region us-east-1',
  block: String.raw`aws s3api put-public-access-block \
  --bucket my-secure-backup \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true`,
  encrypt: String.raw`aws s3api put-bucket-encryption \
  --bucket my-secure-backup \
  --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'`,
  tar: String.raw`sudo tar -czvf backup_linux.tar.gz /home /etc /var /root /usr/local /opt /srv
sha256sum backup_linux.tar.gz > backup_linux.sha256`,
  upload: 'aws s3 cp backup_linux.tar.gz s3://my-secure-backup/',
  acl: 'aws s3api put-object-acl --bucket my-secure-backup --key backup_linux.tar.gz --acl private',
  restore: String.raw`aws s3 cp s3://my-secure-backup/backup_linux.tar.gz .
sha256sum -c backup_linux.sha256 && sudo tar -xzvf backup_linux.tar.gz -C /`,
  cron: String.raw`sudo crontab -e
0 3 * * * sudo tar -czvf /root/backup_linux.tar.gz /home /etc /var /root /usr/local /opt /srv && aws s3 cp /root/backup_linux.tar.gz s3://my-secure-backup/`,
  chmod: 'sudo chmod +x /root/backup_script.sh',
  run: 'sudo /root/backup_script.sh',
  crontabList: 'sudo crontab -l',
  playbookRun: 'ansible-playbook backup_sec.yml',
}

const script = (t: Record<"h1"|"author"|"date"|"vars"|"c1"|"e1"|"c2"|"e2"|"c3"|"c4"|"e4"|"c5"|"e5"|"c6"|"e6"|"e7"|"c8"|"e8"|"e9", string>) => String.raw`#!/bin/bash
# ${t.h1}
# ${t.author}: Marlon Bastida
# ${t.date}: $(date +%Y-%m-%d)

# ${t.vars}
BUCKET_NAME="my-secure-backup"
BACKUP_FILE="/root/backup_linux_$(date +%Y%m%d).tar.gz"
REGION="us-east-1"

# ${t.c1}
echo "${t.e1}"
aws s3api create-bucket --bucket $BUCKET_NAME --region $REGION 2>/dev/null

# ${t.c2}
echo "${t.e2}"
aws s3api put-public-access-block \
    --bucket $BUCKET_NAME \
    --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

# ${t.c3}
aws s3api put-bucket-encryption \
    --bucket $BUCKET_NAME \
    --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'

# ${t.c4}
echo "${t.e4}"
sudo tar -czvf $BACKUP_FILE /home /etc /var /root /usr/local /opt /srv

# ${t.c5}
echo "${t.e5}"
aws s3 cp $BACKUP_FILE s3://$BUCKET_NAME/

# ${t.c6}
echo "${t.e6}"
aws s3api put-object-acl --bucket $BUCKET_NAME --key $(basename $BACKUP_FILE) --acl private

echo "${t.e7}"

# ${t.c8}
if ! sudo crontab -l | grep -q "$BACKUP_FILE"; then
    echo "${t.e8}"
    (sudo crontab -l ; echo "0 3 * * * /bin/bash /root/backup_script.sh") | sudo crontab -
fi

echo "${t.e9}"`

const playbook = (t: Record<"p0"|"p1"|"p2"|"p2b"|"p3"|"p4"|"p5"|"p6"|"p7"|"p8"|"p9"|"p9b", string>) => String.raw`---
- name: ${t.p0}
  hosts: localhost
  become: yes
  vars:
    bucket_name: "my-secure-backup"
    backup_file: "/root/backup_linux_{{ ansible_date_time.date }}.tar.gz"
    region: "us-east-1"
    directories_to_backup:
      - "/home"
      - "/etc"
      - "/var"
      - "/root"
      - "/usr/local"
      - "/opt"
      - "/srv"

  tasks:
    - name: ${t.p1}
      apt:
        name: awscli
        state: present
        update_cache: yes

    - name: ${t.p2}
      shell: |
        aws s3api create-bucket --bucket {{ bucket_name }} --region {{ region }} 2>/dev/null || echo "${t.p2b}"
      ignore_errors: yes

    - name: ${t.p3}
      aws_s3:
        bucket: "{{ bucket_name }}"
        region: "{{ region }}"
        acl: "private"
        state: "present"
        policy:
          Version: "2012-10-17"
          Statement:
            - Effect: "Deny"
              Principal: "*"
              Action: "s3:*"
              Resource:
                - "arn:aws:s3:::{{ bucket_name }}/*"
                - "arn:aws:s3:::{{ bucket_name }}"
              Condition:
                Bool:
                  aws:SecureTransport: "false"

    - name: ${t.p4}
      aws_s3_bucket:
        name: "{{ bucket_name }}"
        region: "{{ region }}"
        encryption:
          enabled: true
          encryption_algorithm: "AES256"

    - name: ${t.p5}
      command: "tar -czvf {{ backup_file }} {{ item }}"
      with_items: "{{ directories_to_backup }}"

    - name: ${t.p6}
      command: "sha256sum {{ backup_file }} > {{ backup_file }}.sha256"

    - name: ${t.p7}
      s3:
        bucket: "{{ bucket_name }}"
        object: "{{ backup_file | basename }}"
        src: "{{ backup_file }}"
        acl: "private"
        mode: "put"

    - name: ${t.p8}
      aws_s3:
        bucket: "{{ bucket_name }}"
        object: "{{ backup_file | basename }}"
        acl: "private"

    - name: ${t.p9}
      cron:
        name: "${t.p9b}"
        minute: "0"
        hour: "3"
        job: "/usr/bin/tar -czvf /root/backup_linux_{{ ansible_date_time.date }}.tar.gz /home /etc /var /root /usr/local /opt /srv && /usr/bin/aws s3 cp /root/backup_linux_{{ ansible_date_time.date }}.tar.gz s3://{{ bucket_name }}/"
        state: present
        user: root`

const p = (text: string): ArticleBlock => ({ type: 'paragraph', text })
const h = (text: string): ArticleBlock => ({ type: 'heading', text })
const l = (...items: string[]): ArticleBlock => ({ type: 'list', items })

export const backupArticleEn: Article = {
  slug: 'linux-backup-aws-s3',
  title: 'How to Perform a Secure Backup of a Linux Desktop to an AWS S3 Bucket',
  summary: 'Step-by-step guide to back up key Linux directories to a private, AES-256 encrypted AWS S3 bucket with SHA256 integrity checks, cron automation, a Bash script and an Ansible playbook.',
  blocks: [
    h('Step 1: Install and Configure the AWS CLI'),
    p('If you don’t have the AWS CLI installed, use:'), c(code.install),
    p('Configure your credentials with aws configure:'), c(code.configure),
    h('Step 2: Create a Secure S3 Bucket'),
    p('Create a secure S3 bucket:'), c(code.create),
    p('1. Block public access to the bucket:'), c(code.block),
    p('2. Enable automatic encryption:'), c(code.encrypt),
    p('This ensures the bucket has no public access and the files are encrypted.'),
    h('Step 3: Compress Important Directories'),
    p('Compress the main directories before uploading to S3 (the backup file will include integrity verification via SHA256 hash):'), c(code.tar),
    h('Step 4: Perform a Secure Upload to S3'), c(code.upload),
    p('📌 Ensure the file is not public:'), c(code.acl),
    h('Step 5: Restore the Backup on a New System'),
    p('Download the backup and restore the files with SHA256 integrity verification:'), c(code.restore),
    h('Step 6: Automation with Cron Job (Optional)'), c(code.cron),
    h('🎯 Security Summary Implemented:'),
    l('✅ S3 bucket with public access blocked.', '✅ AES-256 encryption enabled on the bucket.', '✅ File uploads with private permissions.'),
    h('Automated Script:'),
    c(script({ h1: 'Secure backup of key Linux directories using AWS CLI and S3', author: 'Author', date: 'Date', vars: 'Variables', c1: 'Create a secure S3 bucket (only if it doesn’t already exist)', e1: 'Creating the secure S3 bucket (if necessary)...', c2: 'Block public access to the bucket', e2: 'Configuring bucket security...', c3: 'Enable automatic encryption', c4: 'Compress directories', e4: 'Compressing directories...', c5: 'Upload the file to S3', e5: 'Uploading the backup to S3...', c6: 'Ensure the file has no public access', e6: 'Ensuring private permissions on the file...', e7: 'Backup completed successfully!', c8: 'Add to cron for daily execution', e8: 'Automating the backup with cron...', e9: 'Automation completed!' })),
    h('📌 How to Use the Script:'),
    p('1. Save the script to a file, e.g., /root/backup_script.sh.'),
    p('2. Grant execution permissions:'), c(code.chmod),
    p('3. Run it manually:'), c(code.run),
    p('4. Verify the cron job was added:'), c(code.crontabList),
    h('🎯 What the Script Does:'),
    l('Creates a secure S3 bucket (if it doesn’t exist).', 'Blocks public access and enables AES-256 encryption.', 'Compresses the main directories.', 'Uploads to S3 with private permissions.', 'Sets up daily automation via cron at 3 AM.'),
    p('Alternatively, you can use an Ansible playbook:'),
    h('Ansible Playbook: backup_sec.yml'),
    c(playbook({ p0: 'Secure Backup of Key Linux Directories to AWS S3', p1: 'Install AWS CLI (if not already installed)', p2: 'Create the secure S3 bucket (if necessary)', p2b: 'Bucket already exists', p3: 'Block public access to the bucket', p4: 'Enable automatic encryption on the S3 bucket', p5: 'Compress directories for backup', p6: 'Generate SHA256 hash of the backup file', p7: 'Upload the backup to S3', p8: 'Ensure private permissions on the S3 file', p9: 'Add cron job for daily backup', p9b: 'Daily backup' })),
    h('Playbook Explanation:'),
    l('Install AWS CLI (if necessary): Ensures the AWS CLI is installed.', 'Create S3 Bucket: Attempts to create an S3 bucket with the specified name, ignoring errors if it already exists.', 'Block Public Access: Configures the S3 bucket to block public access and ensure data security.', 'Enable Automatic Encryption: Sets up the bucket to use AES-256 encryption.', 'Compress Directories: Uses the tar command to compress the specified directories.', 'Generate SHA256 Hash: Calculates the SHA256 hash of the compressed file for later verification.', 'Upload to S3: Uploads the compressed file to the S3 bucket with private permissions.', 'Automation with Cron: Configures a cron job to perform the backup daily at 3 AM.'),
    h('How to Use:'),
    p('1. Save the playbook: Save the content above in a YAML file, e.g., backup_sec.yml.'),
    p('2. Run the playbook:'), c(code.playbookRun),
    p('3. Verify Cron: The playbook also automatically sets up the cron job to ensure daily backups.'),
  ],
}

export const backupArticlePt: Article = {
  slug: 'linux-backup-aws-s3',
  title: 'Como fazer um backup seguro de um desktop Linux em um bucket AWS S3',
  summary: 'Guia passo a passo para fazer backup dos principais diretórios do Linux em um bucket AWS S3 privado e criptografado com AES-256, com verificação de integridade SHA256, automação via cron, script Bash e playbook Ansible.',
  blocks: [
    h('Passo 1: Instalar e configurar a AWS CLI'),
    p('Se você não tem a AWS CLI instalada, use:'), c(code.install),
    p('Configure suas credenciais com aws configure:'), c(code.configure),
    h('Passo 2: Criar um bucket S3 seguro'),
    p('Crie um bucket S3 seguro:'), c(code.create),
    p('1. Bloqueie o acesso público ao bucket:'), c(code.block),
    p('2. Ative a criptografia automática:'), c(code.encrypt),
    p('Isso garante que o bucket não tenha acesso público e que os arquivos fiquem criptografados.'),
    h('Passo 3: Compactar os diretórios importantes'),
    p('Compacte os diretórios principais antes de enviar ao S3 (o arquivo de backup terá verificação de integridade via hash SHA256):'), c(code.tar),
    h('Passo 4: Fazer um upload seguro para o S3'), c(code.upload),
    p('📌 Garanta que o arquivo não seja público:'), c(code.acl),
    h('Passo 5: Restaurar o backup em um novo sistema'),
    p('Baixe o backup e restaure os arquivos com verificação de integridade SHA256:'), c(code.restore),
    h('Passo 6: Automação com cron job (opcional)'), c(code.cron),
    h('🎯 Resumo da segurança implementada:'),
    l('✅ Bucket S3 com acesso público bloqueado.', '✅ Criptografia AES-256 ativada no bucket.', '✅ Upload de arquivos com permissões privadas.'),
    h('Script automatizado:'),
    c(script({ h1: 'Backup seguro dos principais diretórios do Linux usando AWS CLI e S3', author: 'Autor', date: 'Data', vars: 'Variáveis', c1: 'Cria um bucket S3 seguro (somente se ainda não existir)', e1: 'Criando o bucket S3 seguro (se necessário)...', c2: 'Bloqueia o acesso público ao bucket', e2: 'Configurando a segurança do bucket...', c3: 'Ativa a criptografia automática', c4: 'Compacta os diretórios', e4: 'Compactando os diretórios...', c5: 'Envia o arquivo para o S3', e5: 'Enviando o backup para o S3...', c6: 'Garante que o arquivo não tenha acesso público', e6: 'Garantindo permissões privadas no arquivo...', e7: 'Backup concluído com sucesso!', c8: 'Adiciona ao cron para execução diária', e8: 'Automatizando o backup com cron...', e9: 'Automação concluída!' })),
    h('📌 Como usar o script:'),
    p('1. Salve o script em um arquivo, por exemplo, /root/backup_script.sh.'),
    p('2. Conceda permissão de execução:'), c(code.chmod),
    p('3. Execute-o manualmente:'), c(code.run),
    p('4. Verifique se o cron job foi adicionado:'), c(code.crontabList),
    h('🎯 O que o script faz:'),
    l('Cria um bucket S3 seguro (se não existir).', 'Bloqueia o acesso público e ativa a criptografia AES-256.', 'Compacta os diretórios principais.', 'Envia para o S3 com permissões privadas.', 'Configura a automação diária via cron às 3h da manhã.'),
    p('Como alternativa, você pode usar um playbook Ansible:'),
    h('Playbook Ansible: backup_sec.yml'),
    c(playbook({ p0: 'Backup seguro dos principais diretórios do Linux para o AWS S3', p1: 'Instalar a AWS CLI (se ainda não estiver instalada)', p2: 'Criar o bucket S3 seguro (se necessário)', p2b: 'O bucket já existe', p3: 'Bloquear o acesso público ao bucket', p4: 'Ativar a criptografia automática no bucket S3', p5: 'Compactar os diretórios para o backup', p6: 'Gerar o hash SHA256 do arquivo de backup', p7: 'Enviar o backup para o S3', p8: 'Garantir permissões privadas no arquivo do S3', p9: 'Adicionar cron job para backup diário', p9b: 'Backup diário' })),
    h('Explicação do playbook:'),
    l('Instalar a AWS CLI (se necessário): garante que a AWS CLI esteja instalada.', 'Criar o bucket S3: tenta criar um bucket S3 com o nome especificado, ignorando erros caso ele já exista.', 'Bloquear o acesso público: configura o bucket S3 para bloquear o acesso público e garantir a segurança dos dados.', 'Ativar a criptografia automática: configura o bucket para usar criptografia AES-256.', 'Compactar os diretórios: usa o comando tar para compactar os diretórios especificados.', 'Gerar o hash SHA256: calcula o hash SHA256 do arquivo compactado para verificação posterior.', 'Enviar para o S3: envia o arquivo compactado para o bucket S3 com permissões privadas.', 'Automação com cron: configura um cron job para realizar o backup diariamente às 3h da manhã.'),
    h('Como usar:'),
    p('1. Salve o playbook: salve o conteúdo acima em um arquivo YAML, por exemplo, backup_sec.yml.'),
    p('2. Execute o playbook:'), c(code.playbookRun),
    p('3. Verifique o cron: o playbook também configura automaticamente o cron job para garantir backups diários.'),
  ],
}
