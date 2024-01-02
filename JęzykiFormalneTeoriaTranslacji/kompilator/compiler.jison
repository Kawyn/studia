%lex

%{
    yy.AST = require('./AST.js');
%}

%%

\#.* /* */

\s+ /* */
\t+ /* */

'PROGRAM'               return 'PROGRAM'
'PROCEDURE'             return 'PROCEDURE'
'IS'                    return 'IS'
'IN'                    return 'IN'

'READ'                  return 'READ'
'WRITE'                 return 'WRITE' 

'T' return  'T'
'IF' return  'IF'
'THEN' return  'THEN'
'ELSE' return  'ELSE'
'ENDIF' return  'ENDIF'
'WHILE' return  'WHILE'
'DO' return  'DO'
'ENDWHILE' return  'ENDWHILE'
'REPEAT' return  'REPEAT'
'UNTIL' return  'UNTIL'
',' return  ','
'END' return  'END'
"!="                   return '!='


[0-9]+                return 'num'
[_a-z]+               return 'pidentifier'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"%"                   return '%'
"("                   return '('
")"                   return ')'
"["                   return '['
"]"                   return ']'
">="                   return '>='
"<="                   return '<='
":="                   return ':='

"="                   return '='

">"                   return '>'
"<"                   return '<'

";"                   return ';'

/lex

%token PROGRAM PROCEDURE IS IN END
%token T 
%token READ WRITE 

%token IF THEN ELSE ENDIF
%token WHILE DO ENDWHILE
%token REPEAT UNTIL

%token ':=' '=' '!=' '<' '>' '<=' '>='


%left '+' '-'
%left '*' '/'
%right '%'

%start program_all

%% 

program_all
    : procedures main
        { return new yy.AST.ROOT($1, $2); }
    ;

procedures
    : procedures PROCEDURE proc_head IS declarations IN commands END
        { $$ = $1.concat([new yy.AST.Procedure($3, $7, $5)]); }
    | procedures PROCEDURE proc_head IS IN commands END
        { $$ = $1.concat([new yy.AST.Procedure($3, $6)]); }
    |
        { $$ = [] }
    ;

main 
    : PROGRAM IS declarations IN commands END
        { $$ = new yy.AST.MAIN($5, $3); }
    | PROGRAM IS IN commands END
        { $$ = new yy.AST.MAIN($4); }
    ;

commands
    : commands command
        { $$ = $1.concat($2); }
    | command
        { $$ = [$1]; }
    ;

command
    : identifier ':=' expression ';'
        { $$ = new yy.AST.SET($1, $3); }
    | IF condition THEN commands ELSE commands ENDIF
        {$$ = new yy.AST.IF_ELSE($2, $4, $6); }
    | IF condition THEN commands ENDIF
        { $$ = new yy.AST.IF($2, $4); }
    | WHILE condition DO commands ENDWHILE
        { $$ = new yy.AST.WHILE($2, $4);}
    | REPEAT commands UNTIL condition ';'
        { $$ = new yy.AST.UNTIL($4, $2); }
    | proc_call ';'
        { $$ = $1 }
    | READ identifier ';'
        { $$ = new yy.AST.READ($2); }
    | WRITE value ';'
        { $$ = new yy.AST.WRITE($2); }
    ;

proc_head 
    : pidentifier '(' args_decl ')'
        { $$ = new yy.AST.Procedure_HEADER($1, $3); }
    ;

proc_call
    : pidentifier '(' args ')'
        { $$ = new yy.AST.CALL($1, $3); }
    ;
    
declarations 
    : declarations ',' pidentifier
        { $$ = $1.concat([new yy.AST.MAIN_DECLERATION($3)]); }
    | declarations ',' pidentifier '[' num ']'
        { $$ = $1.concat([new yy.AST.MAIN_DECLERATION($3, $5)]);  }
    | pidentifier
        { $$ = [new yy.AST.MAIN_DECLERATION($1)]; }
    | pidentifier '[' num ']'
        {  $$ = [new yy.AST.MAIN_DECLERATION($1, $3)];  }
    ;

args_decl
    : args_decl ',' pidentifier
        {  $$ = $1.concat([$3]);}
    | args_decl ',' 'T' pidentifier
        {  $$ = $1.concat([['T', $4]]); }
    | pidentifier
        { $$ = [$1];}
    | 'T' pidentifier
        { $$ = [['T', $2]]; }
    ;

args
    : args ',' pidentifier
        {  $$ = $1.concat($3); }
    | pidentifier
        { $$ = [$1]; }
    ;

expression 
    : value
        { $$ = $1; }
    | value '+' value
        { $$ = new yy.AST.PLUS($1, $3, yylineno); }
    | value '-' value
        { $$ = new yy.AST.MINUS($1, $3, yylineno); }
    | value '*' value
        { $$ = new yy.AST.TIMES($1, $3, yylineno); }
    | value '/' value
        { $$ = new yy.AST.DIV($1, $3, yylineno); }
    | value '%' value
        { $$ = new yy.AST.MOD($1, $3, yylineno);}
    ;

condition 
    : value '=' value
        { $$ = new yy.AST.EQ($1, $3, yylineno); }
    | value '!=' value
        { $$ = new yy.AST.NEQ($1, $3, yylineno); }

    | value '>' value
        { $$ = new yy.AST.GE($1, $3, yylineno); }
    | value '<' value
        { $$ = new yy.AST.LE($1, $3, yylineno); }

    | value '>=' value
        { $$ = new yy.AST.GEQ($1, $3, yylineno);  }
    | value '<=' value
        { $$ = new yy.AST.LEQ($1, $3, yylineno);  }
    ;

value
    : num 
        { $$ = new yy.AST.NUMBER($1, yylineno); }
    | identifier
        { $$ = $1 }

    ;

identifier
    : pidentifier
        { $$ = new yy.AST.VARIABLE($1, undefined, yylineno); }
    | pidentifier '[' num ']'
        { $$ = new yy.AST.VARIABLE($1, $3, yylineno); }
    | pidentifier '[' pidentifier ']'
        { $$ = new yy.AST.VARIABLE($1, $3, yylineno); }
    ;
