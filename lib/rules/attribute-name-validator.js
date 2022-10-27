/**
 * @author youxingz
 * See LICENSE file in root directory for full license.
 */
'use strict'

const utils = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disable some invalid attribute name of custom component by regex pattern, e.g. `/\\w+/-id`, `/id/`, not letter, or other abuseful names.',
      categories: ['attribute-name'],
      url: 'https://eslint.vuejs.org/rules/attribute-name-validator.html'
    },
    fixable: 'code',
    schema: [
      {
        anyOf: [
          { type: 'string' },
          { type: 'object' },
          {
            type: 'array',
            items: {
              anyOf: [
                { type: 'string' },
                { type: 'object' }
              ]
            },
            uniqueItems: true,
            additionalItems: false
          }
        ]
      }
    ],
    messages: {
      unexpected: 'Attribute name `{{name}}` is invalid.'
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    // ...
    /**
     * @type {RegExp[]}
     */
    const regexList = []
    if (typeof context.options === 'string') {
      regexList.push(new RegExp(context.options))
    } else if (context.options instanceof RegExp) {
      regexList.push(context.options)
    } else if (context.options.length > 0) {
      context.options.forEach(regex => {
        if (regex instanceof RegExp) {
          regexList.push(regex)
        } else {
          regexList.push(new RegExp(regex))
        }
      })
    }
    const getName = (/** @type {string | import("../../typings/eslint-plugin-vue/util-types/ast").VIdentifier} */ key) => (typeof key === 'string' ? key : key.name)
    const matchAtLeastOneRule = (/** @type {string} */ name) => {
      if (regexList.length === 0) return true
      for (let regex of regexList) {
        if (regex.test(name)) return true
      }
      return false
    }

    return utils.defineTemplateBodyVisitor(context, {
      VAttribute(node) {
        if (!utils.isCustomComponent(node.parent.parent)) {
          // ignore custom which is not defined by user.
          return
        }

        const name = getName(node.key.name)
        let didReport = false
        if (!matchAtLeastOneRule(name)) {
          didReport = true
          context.report({
            node,
            messageId: 'unexpected',
            data: { name }
          })
        }
        if (
          node.directive &&
          name === 'bind' &&
          node.key.argument &&
          node.key.argument.type === 'VIdentifier' &&
          !matchAtLeastOneRule(node.key.argument.name)
        ) {
          !didReport &&
          context.report({
            node,
            messageId: 'unexpected',
            data: {
              name: node.key.argument.name
            }
          })
          didReport = true
        }

        if (!node.directive && !matchAtLeastOneRule(name)) {
          !didReport &&
          context.report({
            node,
            messageId: 'unexpected',
            data: { name }
          })
          didReport = true
        }
      }
    })
  }
}
