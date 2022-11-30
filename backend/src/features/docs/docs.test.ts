'use strict'

import { expect } from 'chai'
import { settings } from '../../core/config'
import server from '../../core/server'

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

describe('Docs', () => {
  before(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    server.listen()
  })
  describe('#routes', () => {
    it('should get standard response from docs', async () => {
      const res = await chai.request(settings.url.api).get('/api/docs')
      res.should.have.status(200)
    })
  })
  after(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
    server.close()
  })
})
