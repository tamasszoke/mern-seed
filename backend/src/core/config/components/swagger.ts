import swaggerJsDoc from 'swagger-jsdoc'
import settings from './settings'
import docs from '../../../features/docs'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `${settings.name} API Documentation`,
      version: '3.0.0',
      description: docs.description,
    },
    servers: [
      {
        url: `https://localhost:${settings.port}`,
        description: 'Backend API for the React frontend',
      },
    ],
  },
  apis: ['./src/**/*.docs.yaml'],
}

const specs = swaggerJsDoc(options)

const styles = {
  customCss:
    '.swagger-ui .topbar { display: none; } *:focus { outline: none !important; }',
  customCssUrl: '/public/css/swagger-ui-dark.css',
  customSiteTitle: `${settings.name} API Documentation`,
  swaggerOptions: {},
}

export default {
  specs,
  styles,
}
export { specs, styles }
