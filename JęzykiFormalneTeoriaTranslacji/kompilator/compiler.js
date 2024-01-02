/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var compiler = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[6,13],$V1=[1,13],$V2=[1,20],$V3=[1,24],$V4=[1,25],$V5=[1,26],$V6=[1,28],$V7=[1,29],$V8=[1,30],$V9=[10,38],$Va=[36,38],$Vb=[12,19,22,23,24,26,27,28,30,31,33],$Vc=[1,46],$Vd=[1,44],$Ve=[2,43],$Vf=[1,52],$Vg=[18,21,25,43,44,45,46,47,48,49,50,51,52,53],$Vh=[18,21,25],$Vi=[16,18,21,25,43,44,45,46,47,48,49,50,51,52,53];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"program_all":3,"procedures":4,"main":5,"PROCEDURE":6,"proc_head":7,"IS":8,"declarations":9,"IN":10,"commands":11,"END":12,"PROGRAM":13,"command":14,"identifier":15,":=":16,"expression":17,";":18,"IF":19,"condition":20,"THEN":21,"ELSE":22,"ENDIF":23,"WHILE":24,"DO":25,"ENDWHILE":26,"REPEAT":27,"UNTIL":28,"proc_call":29,"READ":30,"WRITE":31,"value":32,"pidentifier":33,"(":34,"args_decl":35,")":36,"args":37,",":38,"[":39,"num":40,"]":41,"T":42,"+":43,"-":44,"*":45,"/":46,"%":47,"=":48,"!=":49,">":50,"<":51,">=":52,"<=":53,"$accept":0,"$end":1},
terminals_: {2:"error",6:"PROCEDURE",8:"IS",10:"IN",12:"END",13:"PROGRAM",16:":=",18:";",19:"IF",21:"THEN",22:"ELSE",23:"ENDIF",24:"WHILE",25:"DO",26:"ENDWHILE",27:"REPEAT",28:"UNTIL",30:"READ",31:"WRITE",33:"pidentifier",34:"(",36:")",38:",",39:"[",40:"num",41:"]",42:"T",43:"+",44:"-",45:"*",46:"/",47:"%",48:"=",49:"!=",50:">",51:"<",52:">=",53:"<="},
productions_: [0,[3,2],[4,8],[4,7],[4,0],[5,6],[5,5],[11,2],[11,1],[14,4],[14,7],[14,5],[14,5],[14,5],[14,2],[14,3],[14,3],[7,4],[29,4],[9,3],[9,6],[9,1],[9,4],[35,3],[35,4],[35,1],[35,2],[37,3],[37,1],[17,1],[17,3],[17,3],[17,3],[17,3],[17,3],[20,3],[20,3],[20,3],[20,3],[20,3],[20,3],[32,1],[32,1],[15,1],[15,4],[15,4]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return new yy.AST.ROOT($$[$0-1], $$[$0]); 
break;
case 2:
 this.$ = $$[$0-7].concat([new yy.AST.Procedure($$[$0-5], $$[$0-1], $$[$0-3])]); 
break;
case 3:
 this.$ = $$[$0-6].concat([new yy.AST.Procedure($$[$0-4], $$[$0-1])]); 
break;
case 4:
 this.$ = [] 
break;
case 5:
 this.$ = new yy.AST.MAIN($$[$0-1], $$[$0-3]); 
break;
case 6:
 this.$ = new yy.AST.MAIN($$[$0-1]); 
break;
case 7:
 this.$ = $$[$0-1].concat($$[$0]); 
break;
case 8: case 28:
 this.$ = [$$[$0]]; 
break;
case 9:
 this.$ = new yy.AST.SET($$[$0-3], $$[$0-1]); 
break;
case 10:
this.$ = new yy.AST.IF_ELSE($$[$0-5], $$[$0-3], $$[$0-1]); 
break;
case 11:
 this.$ = new yy.AST.IF($$[$0-3], $$[$0-1]); 
break;
case 12:
 this.$ = new yy.AST.WHILE($$[$0-3], $$[$0-1]);
break;
case 13:
 this.$ = new yy.AST.UNTIL($$[$0-1], $$[$0-3]); 
break;
case 14:
 this.$ = $$[$0-1] 
break;
case 15:
 this.$ = new yy.AST.READ($$[$0-1]); 
break;
case 16:
 this.$ = new yy.AST.WRITE($$[$0-1]); 
break;
case 17:
 this.$ = new yy.AST.Procedure_HEADER($$[$0-3], $$[$0-1]); 
break;
case 18:
 this.$ = new yy.AST.CALL($$[$0-3], $$[$0-1]); 
break;
case 19:
 this.$ = $$[$0-2].concat([new yy.AST.MAIN_DECLERATION($$[$0])]); 
break;
case 20:
 this.$ = $$[$0-5].concat([new yy.AST.MAIN_DECLERATION($$[$0-3], $$[$0-1])]);  
break;
case 21:
 this.$ = [new yy.AST.MAIN_DECLERATION($$[$0])]; 
break;
case 22:
  this.$ = [new yy.AST.MAIN_DECLERATION($$[$0-3], $$[$0-1])];  
break;
case 23:
  this.$ = $$[$0-2].concat([$$[$0]]);
break;
case 24:
  this.$ = $$[$0-3].concat([['T', $$[$0]]]); 
break;
case 25:
 this.$ = [$$[$0]];
break;
case 26:
 this.$ = [['T', $$[$0]]]; 
break;
case 27:
  this.$ = $$[$0-2].concat($$[$0]); 
break;
case 29:
 this.$ = $$[$0]; 
break;
case 30:
 this.$ = new yy.AST.PLUS($$[$0-2], $$[$0], yylineno); 
break;
case 31:
 this.$ = new yy.AST.MINUS($$[$0-2], $$[$0], yylineno); 
break;
case 32:
 this.$ = new yy.AST.TIMES($$[$0-2], $$[$0], yylineno); 
break;
case 33:
 this.$ = new yy.AST.DIV($$[$0-2], $$[$0], yylineno); 
break;
case 34:
 this.$ = new yy.AST.MOD($$[$0-2], $$[$0], yylineno);
break;
case 35:
 this.$ = new yy.AST.EQ($$[$0-2], $$[$0], yylineno); 
break;
case 36:
 this.$ = new yy.AST.NEQ($$[$0-2], $$[$0], yylineno); 
break;
case 37:
 this.$ = new yy.AST.GE($$[$0-2], $$[$0], yylineno); 
break;
case 38:
 this.$ = new yy.AST.LE($$[$0-2], $$[$0], yylineno); 
break;
case 39:
 this.$ = new yy.AST.GEQ($$[$0-2], $$[$0], yylineno);  
break;
case 40:
 this.$ = new yy.AST.LEQ($$[$0-2], $$[$0], yylineno);  
break;
case 41:
 this.$ = new yy.AST.NUMBER($$[$0], yylineno); 
break;
case 42:
 this.$ = $$[$0] 
break;
case 43:
 this.$ = new yy.AST.VARIABLE($$[$0], undefined, yylineno); 
break;
case 44: case 45:
 this.$ = new yy.AST.VARIABLE($$[$0-3], $$[$0-1], yylineno); 
break;
}
},
table: [o($V0,[2,4],{3:1,4:2}),{1:[3]},{5:3,6:[1,4],13:[1,5]},{1:[2,1]},{7:6,33:[1,7]},{8:[1,8]},{8:[1,9]},{34:[1,10]},{9:11,10:[1,12],33:$V1},{9:14,10:[1,15],33:$V1},{33:[1,17],35:16,42:[1,18]},{10:[1,19],38:$V2},{11:21,14:22,15:23,19:$V3,24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},o($V9,[2,21],{39:[1,31]}),{10:[1,32],38:$V2},{11:33,14:22,15:23,19:$V3,24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},{36:[1,34],38:[1,35]},o($Va,[2,25]),{33:[1,36]},{11:37,14:22,15:23,19:$V3,24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},{33:[1,38]},{12:[1,39],14:40,15:23,19:$V3,24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},o($Vb,[2,8]),{16:[1,41]},{15:45,20:42,32:43,33:$Vc,40:$Vd},{15:45,20:47,32:43,33:$Vc,40:$Vd},{11:48,14:22,15:23,19:$V3,24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},{18:[1,49]},{15:50,33:$Vc},{15:45,32:51,33:$Vc,40:$Vd},{16:$Ve,34:[1,53],39:$Vf},{40:[1,54]},{11:55,14:22,15:23,19:$V3,24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},{12:[1,56],14:40,15:23,19:$V3,24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},{8:[2,17]},{33:[1,57],42:[1,58]},o($Va,[2,26]),{12:[1,59],14:40,15:23,19:$V3,24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},o($V9,[2,19],{39:[1,60]}),{1:[2,6]},o($Vb,[2,7]),{15:45,17:61,32:62,33:$Vc,40:$Vd},{21:[1,63]},{48:[1,64],49:[1,65],50:[1,66],51:[1,67],52:[1,68],53:[1,69]},o($Vg,[2,41]),o($Vg,[2,42]),o($Vg,$Ve,{39:$Vf}),{25:[1,70]},{14:40,15:23,19:$V3,24:$V4,27:$V5,28:[1,71],29:27,30:$V6,31:$V7,33:$V8},o($Vb,[2,14]),{18:[1,72]},{18:[1,73]},{33:[1,75],40:[1,74]},{33:[1,77],37:76},{41:[1,78]},{12:[1,79],14:40,15:23,19:$V3,24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},o($V0,[2,3]),o($Va,[2,23]),{33:[1,80]},{1:[2,5]},{40:[1,81]},{18:[1,82]},{18:[2,29],43:[1,83],44:[1,84],45:[1,85],46:[1,86],47:[1,87]},{11:88,14:22,15:23,19:$V3,24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},{15:45,32:89,33:$Vc,40:$Vd},{15:45,32:90,33:$Vc,40:$Vd},{15:45,32:91,33:$Vc,40:$Vd},{15:45,32:92,33:$Vc,40:$Vd},{15:45,32:93,33:$Vc,40:$Vd},{15:45,32:94,33:$Vc,40:$Vd},{11:95,14:22,15:23,19:$V3,24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},{15:45,20:96,32:43,33:$Vc,40:$Vd},o($Vb,[2,15]),o($Vb,[2,16]),{41:[1,97]},{41:[1,98]},{36:[1,99],38:[1,100]},o($Va,[2,28]),o($V9,[2,22]),o($V0,[2,2]),o($Va,[2,24]),{41:[1,101]},o($Vb,[2,9]),{15:45,32:102,33:$Vc,40:$Vd},{15:45,32:103,33:$Vc,40:$Vd},{15:45,32:104,33:$Vc,40:$Vd},{15:45,32:105,33:$Vc,40:$Vd},{15:45,32:106,33:$Vc,40:$Vd},{14:40,15:23,19:$V3,22:[1,107],23:[1,108],24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},o($Vh,[2,35]),o($Vh,[2,36]),o($Vh,[2,37]),o($Vh,[2,38]),o($Vh,[2,39]),o($Vh,[2,40]),{14:40,15:23,19:$V3,24:$V4,26:[1,109],27:$V5,29:27,30:$V6,31:$V7,33:$V8},{18:[1,110]},o($Vi,[2,44]),o($Vi,[2,45]),{18:[2,18]},{33:[1,111]},o($V9,[2,20]),{18:[2,30]},{18:[2,31]},{18:[2,32]},{18:[2,33]},{18:[2,34]},{11:112,14:22,15:23,19:$V3,24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},o($Vb,[2,11]),o($Vb,[2,12]),o($Vb,[2,13]),o($Va,[2,27]),{14:40,15:23,19:$V3,23:[1,113],24:$V4,27:$V5,29:27,30:$V6,31:$V7,33:$V8},o($Vb,[2,10])],
defaultActions: {3:[2,1],34:[2,17],39:[2,6],59:[2,5],99:[2,18],102:[2,30],103:[2,31],104:[2,32],105:[2,33],106:[2,34]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
    yy.AST = require('./AST.js');

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* */
break;
case 1:/* */
break;
case 2:/* */
break;
case 3:return 13
break;
case 4:return 6
break;
case 5:return 8
break;
case 6:return 10
break;
case 7:return 30
break;
case 8:return 31 
break;
case 9:return  'T'
break;
case 10:return  'IF'
break;
case 11:return  'THEN'
break;
case 12:return  'ELSE'
break;
case 13:return  'ENDIF'
break;
case 14:return  'WHILE'
break;
case 15:return  'DO'
break;
case 16:return  'ENDWHILE'
break;
case 17:return  'REPEAT'
break;
case 18:return  'UNTIL'
break;
case 19:return  ','
break;
case 20:return  'END'
break;
case 21:return 49
break;
case 22:return 40
break;
case 23:return 33
break;
case 24:return 45
break;
case 25:return 46
break;
case 26:return 44
break;
case 27:return 43
break;
case 28:return 47
break;
case 29:return 34
break;
case 30:return 36
break;
case 31:return 39
break;
case 32:return 41
break;
case 33:return 52
break;
case 34:return 53
break;
case 35:return 16
break;
case 36:return 48
break;
case 37:return 50
break;
case 38:return 51
break;
case 39:return 18
break;
}
},
rules: [/^(?:#.*)/,/^(?:\s+)/,/^(?:\t+)/,/^(?:PROGRAM\b)/,/^(?:PROCEDURE\b)/,/^(?:IS\b)/,/^(?:IN\b)/,/^(?:READ\b)/,/^(?:WRITE\b)/,/^(?:T\b)/,/^(?:IF\b)/,/^(?:THEN\b)/,/^(?:ELSE\b)/,/^(?:ENDIF\b)/,/^(?:WHILE\b)/,/^(?:DO\b)/,/^(?:ENDWHILE\b)/,/^(?:REPEAT\b)/,/^(?:UNTIL\b)/,/^(?:,)/,/^(?:END\b)/,/^(?:!=)/,/^(?:[0-9]+)/,/^(?:[_a-z]+)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:%)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:>=)/,/^(?:<=)/,/^(?::=)/,/^(?:=)/,/^(?:>)/,/^(?:<)/,/^(?:;)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = compiler;
exports.Parser = compiler.Parser;
exports.parse = function () { return compiler.parse.apply(compiler, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}