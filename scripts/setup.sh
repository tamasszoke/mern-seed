#!/bin/bash

clear
echo "MERN-SEED Setup"
echo ""
echo "1. Installing dependencies on backend, frontend, root"
echo "2. Configure env variables on backend, frontend, root"
echo ""

prepare() {
  rm -rf ./scripts/log
  mkdir -p ./scripts/log
  mkdir -p ./backend/.env
}

askDepsInstall() {
  echo ""
  read -rp "1. Install dependencies using 'yarn install'? [Y/n] " depsResponse
  depsResponse=${depsResponse:l} # tolower
  if [[ $depsResponse =~ ^(y| ) ]] || [[ -z $depsResponse ]]; then
    depsInstall
  else
    echo "Dependencies not installed!"
  fi
}

depsInstall() {
  echo ""
  echo "Installing backend dependencies... (~1m)"
  yarn --cwd backend/ install &>./scripts/log/backend.setup.log
  echo "Done"
  echo ""
  echo "Installing frontend dependencies... (~5m)"
  yarn --cwd frontend/ install &>./scripts/log/frontend.setup.log
  echo "Done"
  echo ""
  echo "Installing root dependencies... (~1m)"
  yarn install &>./scripts/log/root.setup.log
  echo "Done"
}

askEnvConfig() {
  echo ""
  read -rp "2. Configure env variables? [Y/n] " envResponse
  envResponse=${envResponse:l} # tolower
  if [[ $envResponse =~ ^(y| ) ]] || [[ -z $envResponse ]]; then
    envConfig
  else
    echo "Env variables not configured!"
  fi
}

envConfig() {
  devCookieSecret=$(openssl rand -hex 12)
  prodCookieSecret=$(openssl rand -hex 12)
  envConfigDev
  envConfigProd
  envReview
}

envConfigSsl() {
  echo ""
  read -rp "Generate SSL certificate? [Y/n] " sslResponse
  sslResponse=${sslResponse:l} # tolower
  if [[ $sslResponse =~ ^(y| ) ]] || [[ -z $sslResponse ]]; then
    mkdir -p ./backend/.ssl
    openssl req -x509 -sha256 -newkey rsa:4096 -keyout ./backend/.ssl/key.pem -out ./backend/.ssl/cert.pem -nodes -days 365 -subj '/CN=localhost' &>/dev/null
    sslKey=".ssl/key.pem"
    sslCert=".ssl/cert.pem"
    echo "[DEV] SSL certificate generated"
  else
    read -rp "[DEV] Put your SSL files (key, cert) inside './backend/.ssl/' or a custom folder and press any key!"
    read -rp "[DEV] SSL key file path relative to backend (.ssl/key.pem): " sslKey
    sslKey=${sslKey:-.ssl/key.pem}
    read -rp "[DEV] SSL cert file path relative to backend (.ssl/cert.pem): " sslCert
    sslCert=${sslCert:-.ssl/cert.pem}
  fi
}

envConfigJwt() {
  read -rp "Generate JWT keys? [Y/n] " jwtResponse
  jwtResponse=${jwtResponse:l} # tolower
  if [[ $jwtResponse =~ ^(y| ) ]] || [[ -z $jwtResponse ]]; then
    mkdir -p ./backend/.jwt
    openssl genrsa -out ./backend/.jwt/secret.pem 2048 &>/dev/null
    openssl rsa -in ./backend/.jwt/secret.pem -outform PEM -pubout -out ./backend/.jwt/public.pem &>/dev/null
    jwtSecret=".jwt/secret.pem"
    jwtPublic=".jwt/public.pem"
    echo "[DEV] JWT keys generated"
  else
    read -rp "[DEV] Put your JWT files (secret, public) inside './backend/.jwt/' or a custom folder and press any key!"
    read -rp "[DEV] JWT secret file path relative to backend (.jwt/jwt.secret.pem): " jwtSecret
    jwtSecret=${jwtSecret:-.jwt/secret.pem}
    read -rp "[DEV] JWT public file path relative to backend (.jwt/jwt.public.pem): " jwtPublic
    jwtPublic=${jwtPublic:-.jwt/public.pem}
  fi
}

envConfigSslProd() {
  echo ""
  read -rp "Generate production SSL certificate? [Y/n] " sslResponseProd
  sslResponseProd=${sslResponseProd:l} # tolower
  if [[ $sslResponseProd =~ ^(y| ) ]] || [[ -z $sslResponseProd ]]; then
    openssl req -x509 -sha256 -newkey rsa:4096 -keyout ./backend/.ssl/key.prod.pem -out ./backend/.ssl/cert.prod.pem -nodes -days 365 -subj '/CN=localhost' &>/dev/null
    sslKeyProd=".ssl/key.prod.pem"
    sslCertProd=".ssl/cert.prod.pem"
    echo "[PROD] SSL certificate generated"
  else
    read -rp "[PROD] Put your SSL files (key, cert) inside './backend/.ssl/' or a custom folder and press any key!"
    read -rp "[PROD] SSL key file path relative to backend (.ssl/key.pem): " sslKeyProd
    sslKeyProd=${sslKeyProd:-.ssl/key.pem}
    read -rp "[PROD] SSL cert file path relative to backend (.ssl/cert.pem): " sslCertProd
    sslCertProd=${sslCertProd:-.ssl/cert.pem}
  fi
}

envConfigJwtProd() {
  read -rp "Generate production JWT keys? [Y/n] " jwtResponseProd
  jwtResponseProd=${jwtResponseProd:l} # tolower
  if [[ $jwtResponseProd =~ ^(y| ) ]] || [[ -z $jwtResponseProd ]]; then
    openssl genrsa -out ./backend/.jwt/secret.prod.pem 2048 &>/dev/null
    openssl rsa -in ./backend/.jwt/secret.prod.pem -outform PEM -pubout -out ./backend/.jwt/public.prod.pem &>/dev/null
    depsResponse=${depsResponse:l}
    jwtSecretProd=".jwt/secret.prod.pem"
    jwtPublicProd=".jwt/public.prod.pem"
    echo "[PROD] JWT keys generated"
  else
    read -rp "[PROD] Put your JWT files (secret, public) inside './backend/.jwt/' or a custom folder and press any key!"
    read -rp "[PROD] JWT secret file path relative to backend (.jwt/secret.pem): " jwtSecretProd
    jwtSecretProd=${jwtSecretProd:-.jwt/secret.pem}
    read -rp "[PROD] JWT public file path relative to backend (.jwt/public.pem): " jwtPublicProd
    jwtPublicProd=${jwtPublicProd:-.jwt/public.pem}
  fi
}

envConfigDev() {
  echo ""
  echo "Development setup"
  envConfigSsl
  envConfigJwt
  read -rp "[DEV] Backend port (3001): " backendPort
  backendPort=${backendPort:-3001}
  read -rp "[DEV] Frontend port (3000): " frontendPort
  frontendPort=${frontendPort:-3000}
  read -rp "[DEV] Cookie secret (openssl hex): " cookieSecret
  cookieSecret=${cookieSecret:-$devCookieSecret}
  read -rp "[DEV] Database url: " databaseUrl
  read -rp "[DEV] Email user: " emailUser
  read -rp "[DEV] Email password: " emailPass
  read -rp "[DEV] Email from (noreply@mernseed.com): " emailFrom
  emailFrom=${emailFrom:-noreply@mernseed.com}
  read -rp "[DEV] Email API url: " emailApiUrl
  read -rp "[DEV] Email API token: " emailApiToken
}

envConfigProd() {
  echo ""
  echo "Production setup"
  envConfigSslProd
  envConfigJwtProd
  read -rp "[PROD] Port number (8080): " portProd
  portProd=${portProd:-8080}
  read -rp "[PROD] Cookie secret (openssl hex): " cookieSecretProd
  cookieSecretProd=${cookieSecretProd:-$prodCookieSecret}
  read -rp "[PROD] Database url (copy from dev): " databaseUrlProd
  databaseUrlProd=${databaseUrlProd:-$databaseUrl}
  read -rp "[PROD] Email user (copy from dev): " emailUserProd
  emailUserProd=${emailUserProd:-$emailUser}
  read -rp "[PROD] Email password (copy from dev): " emailPassProd
  emailPassProd=${emailPassProd:-$emailPass}
  read -rp "[PROD] Email from (copy from dev): " emailFromProd
  emailFromProd=${emailFromProd:-$emailFrom}
}

envReview() {
  echo ""
  echo "All done!"
  sleep 1s
  echo ""
  echo "Review your configuration!"
  echo ""
  echo "Development"
  echo "SSL key: $sslKey"
  echo "SSL cert: $sslCert"
  echo "JWT secret: $jwtSecret"
  echo "JWT public: $jwtPublic"
  echo "Backend port: $backendPort"
  echo "Frontend port: $frontendPort"
  echo "Cookie secret: $cookieSecret"
  echo "Database url: $databaseUrl"
  echo "Email user: $emailUser"
  echo "Email password: $emailPass"
  echo "Email from: $emailFrom"
  echo "Email API Url: $emailApiUrl"
  echo "Email API Token: $emailApiToken"
  echo ""
  echo "Production"
  echo "SSL key: $sslKeyProd"
  echo "SSL cert: $sslCertProd"
  echo "JWT secret: $jwtSecretProd"
  echo "JWT public: $jwtPublicProd"
  echo "Port: $portProd"
  echo "Cookie secret: $cookieSecretProd"
  echo "Database url: $databaseUrlProd"
  echo "Email user: $emailUserProd"
  echo "Email password: $emailPassProd"
  echo "Email from: $emailFromProd"
  echo ""
  echo "WARNING! Overwriting any previous configuration!"
  echo ""
  read -rp "Save this configuration? [Y/n] " saveResponse
  saveResponse=${saveResponse:l} # tolower
  if [[ $saveResponse =~ ^(y| ) ]] || [[ -z $saveResponse ]]; then
    envSave
  else
    echo "Configuration not saved!"
  fi
}

envSave() {
  echo "Saving configuration..."
  {
    echo "HOST=0.0.0.0"
    echo "PORT=$backendPort"
    echo "FRONTEND_HOST=localhost"
    echo "FRONTEND_PORT=$frontendPort"
    echo "SSL_KEY=$sslKey"
    echo "SSL_CERT=$sslCert"
    echo "JWT_SECRET=$jwtSecret"
    echo "JWT_PUBLIC=$jwtPublic"
    echo "COOKIE_SECRET=$cookieSecret"
    echo "DATABASE_URL=$databaseUrl"
    echo "EMAIL_USER=$emailUser"
    echo "EMAIL_PASS=$emailPass"
    echo "EMAIL_FROM=$emailFrom"
  } >./backend/.env/.env.development
  {
    echo "HOST=0.0.0.0"
    echo "PORT=$portProd"
    echo "FRONTEND_HOST=localhost"
    echo "FRONTEND_PORT=$portProd"
    echo "SSL_KEY=$sslKeyProd"
    echo "SSL_CERT=$sslCertProd"
    echo "JWT_SECRET=$jwtSecretProd"
    echo "JWT_PUBLIC=$jwtPublicProd"
    echo "COOKIE_SECRET=$cookieSecretProd"
    echo "DATABASE_URL=$databaseUrlProd"
    echo "EMAIL_USER=$emailUserProd"
    echo "EMAIL_PASS=$emailPassProd"
    echo "EMAIL_FROM=$emailFromProd"
  } >./backend/.env/.env.production
  {
    echo "REACT_APP_HOST=0.0.0.0"
    echo "REACT_APP_PORT=$frontendPort"
    echo "REACT_APP_BACKEND_HOST=localhost"
    echo "REACT_APP_BACKEND_PORT=$backendPort"
    echo "SKIP_PREFLIGHT_CHECK=true"
    echo "CHOKIDAR_USEPOLLING=true"
  } >./frontend/.env.development
  {
    echo "REACT_APP_HOST=0.0.0.0"
    echo "REACT_APP_PORT=$portProd"
    echo "REACT_APP_BACKEND_HOST=localhost"
    echo "REACT_APP_BACKEND_PORT=$portProd"
    echo "SKIP_PREFLIGHT_CHECK=true"
    echo "CHOKIDAR_USEPOLLING=true"
  } >./frontend/.env.production
  {
    echo "{"
    echo "  \"EMAIL_API_URL\": \"$emailApiUrl\","
    echo "  \"EMAIL_API_TOKEN\": \"$emailApiToken\""
    echo "}"
  } >./frontend/cypress.env.json
  {
    echo "import { defineConfig } from 'cypress'"
    echo ""
    echo "export default defineConfig({"
    echo "  e2e: {"
    echo "    baseUrl: 'https://localhost:$frontendPort',"
    echo "  },"
    echo "})"
  } >./frontend/cypress.config.ts
  {
    echo "DEVELOPMENT_BACKEND_PORT=$backendPort"
    echo "DEVELOPMENT_FRONTEND_PORT=$frontendPort"
    echo "PRODUCTION_PORT=$portProd"
  } >./.env
  echo ""
  echo "Configuration saved to the following files:"
  echo "./backend/.env/.env.development"
  echo "./backend/.env/.env.production"
  echo "./frontend/.env.development"
  echo "./frontend/.env.production"
  echo "./frontend/cypress.env.json"
  echo "./frontend/cypress.config.ts"
  echo "./.env"
  echo ""
  echo "Run 'yarn docker:dev'"
  echo "Or 'docker-compose -f docker-compose.development.yml up'"
  echo "To start the application!"
  echo ""
  echo "Backend: localhost:$backendPort"
  echo "Frontend: localhost:$frontendPort"
  echo "Production: localhost:$portProd"
  echo ""
}

start() {
  prepare
  askDepsInstall
  askEnvConfig
}

read -rp "Press any key to start!"
start
