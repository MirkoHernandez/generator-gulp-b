var esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require('escodegen');

/**
 * @param {node}  node -  estraverse node  to be  modified. Must  be a
 * variable assignment -- tempProperty = {}
 * @param {string} properties - the properties to be added to the node.
 */
function nodeAddProperty(node, properties) {
    let currentProperties = null;
    let newTree = esprima.parseScript(properties,{tolerant:true});
    estraverse.traverse(newTree, {
	enter: function (node,parent) {
	    if (node.type === 'AssignmentExpression') {
		currentProperties = node.right.properties;
		return estraverse.VisitorOption.Break;
	    }
	}
    })
    node.init.properties = node.init.properties.concat(currentProperties);
}

/**
 * @param {node} node - esprima node to check for a comment.
 * @param {string} comment - comment to be found. 
 */
function commentFound(node, commentString) {
    return node.type == 'LineComment' && node.value.trim() === commentString.trim();
}


function addNodeToBeginningOfProgram(ast,newNode) {
    ast.body = newNode.body.concat(ast.body); 
}

function displayNodes(ast) {
    estraverse.traverse(ast, {
	enter: function (node,parent) {
	    console.log(JSON.stringify(node, null, 4));
	}
    });
}

exports.addCodeToBeginningOfProgram = function (source, newCode) { 
    let ast = esprima.parseScript(source,  {range: true, tokens: true, comment: true, loc: true});
    let newNode =  esprima.parseScript(newCode,{range: true, tokens: true, comment: true, loc: true});
    ast.body = newNode.body.concat(ast.body); 
    return escodegen.generate(ast);;
}



/**
 * @param {string} source - source code of the program.
 * @param {string} comment - comment after which to insert the new code. 
 * @param {string} newCode - new code to be inserted in the program.
 */
exports.insertAfterComment = function (source,comment,newCode) { 
    let endLine = null;
    esprima.parseScript(source, {comment:true}, function (node, meta) {
	if (commentFound(node,comment)) {
	    if (endLine) {
		console.log("Duplicates found");
	    }
	    endLine = meta.end.offset;
	}
    });
    
    let newAst = esprima.parseScript(newCode,{tolerant:true});
    newNode =  escodegen.generate(newAst,{});
    source = source.slice(0, endLine) + '\n' + newNode+  source.slice(endLine);
    return source;
}

/**
 * @param {string} source - source code of the program.
 * @param {string} variable - variable name. 
 * @param {string} properties - properties to be added.
 */
exports.addProperty = function (source,variable,properties) {
    let ast = esprima.parseScript(source, {range: true, tokens: true, comment: true, loc: true})
    ast = escodegen.attachComments(ast, ast.comments, ast.tokens);

    estraverse.traverse(ast, {
	enter: function (node, parent) {
            if (node.type === 'VariableDeclarator' && node.id.name === variable) {
		nodeAddProperty(node, properties)
		return estraverse.VisitorOption.Break;
	    }
	},
    });
    const  escodegenOptions  = {
	format: {
	    preserveBlankLines: true,
	},
	sourceCode: source,
	comment: true,
    }
    return escodegen.generate(ast, escodegenOptions);
}
