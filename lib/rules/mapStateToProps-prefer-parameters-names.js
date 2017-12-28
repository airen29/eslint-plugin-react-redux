const argumentNames = [
  'state',
  'ownProps',
];

const report = function (context, node, i) {
  context.report({
    message: `mapStateToProps function parameter #${i} should be named ${argumentNames[i]}`,
    node,
  });
};

const checkDeclaration = function (context, node) {
  if (node.id && node.id.name === 'mapStateToProps'
    && node.init && node.init.params
  ) {
    node.init.params.forEach((param, i) => {
      if (argumentNames[i] && argumentNames[i] !== param.name) {
        report(context, param, i);
      }
    });
  }
};

module.exports = function (context) {
  return {
    VariableDeclaration(node) {
      node.declarations.forEach(decl => checkDeclaration(context, decl));
    },
  };
};