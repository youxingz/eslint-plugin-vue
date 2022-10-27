/**
 * @author youxingz
 * See LICENSE file in root directory for full license.
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/attribute-name-validator')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('attribute-name-validator', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
      <template>
        <CustomComponent id="demo"/>
      </template>
      `,
      options: [/id/]
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
      <template>
        <CustomComponent jd="demo"></CustomComponent>
      </template>
      `,
      options: [/id/],
      errors: [
        {
          message: 'Attribute name `jd` is invalid.',
        },
      ]
    }
  ]
})
