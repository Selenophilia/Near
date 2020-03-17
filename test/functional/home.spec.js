'use strict'

const { test, trait } = use('Test/Suite')('HomeController')

trait('Test/ApiClient')

test('home', async ({ client }) => {

  const response = await client.get('/').end()

  response.assertStatus(200)
})
