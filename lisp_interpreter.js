var init = function (initialise_callback) {
		var lisp_fns = {
				"+": {
					"minArity": 1,
					"maxArity": Infinity,
					"dataType": "number",
					"fn": function (args) {
						var rtn = 0; // CLISP returns 0 if `+` is given no arguments.
						while (args.length) {
							rtn += args.shift();
						};
						return rtn;
					}
				},
				"-": function (args) {
					var rtn = args.shift();
					while (args.length) {
						rtn -= args.shift();
					};
					return rtn;
				},
				"*": function (args) {
					var rtn = 1; // CLISP returns 1 if `*` is given no arguments.
					while (args.length) {
						rtn *= args.shift();
					};
					return rtn;
				},
				"/": function (args) {
					var rtn = args.shift();
					while (args.length) {
						rtn /= args.shift();
					}
					return rtn;
				}
			},

			wrap_function = function (fn_object) {

				// Decide on how the function should be accessed.
				var fn = (fn_object.hasOwnProperty("fn")) ? fn_object.fn : fn_object;

				return function (args) {
					var rtn;
					if (args instanceof Array) {
						rtn = fn(args);
					}
					return rtn;
				}
			},

			separate_terms = function (input) {
				var str = input,
					arr = [],
					rst = "",
					rex = /(\s+)|(")|(\()|(\))|(.$)/g,
					begin_term = 0,
					end_term = 0,
					paren_level = 0,
					quote_level = false,
					rfn = function ($m, $1, $2, $3, $4, $5, offset, whole_string) {
						var out;
						if ($2 && !paren_level) {
							console.log(quote_level);
							quote_level = !quote_level;
							if (quote_level) {
								begin_term = offset;
							} else {
								end_term = offset + $m.length;
								out = whole_string.slice(begin_term, end_term);
								begin_term = end_term;
							}
						} else if ($3 && !quote_level) {
							paren_level += 1;
							if (!paren_level) {
								begin_term = offset;
							}
						} else if ($4 && !quote_level) {
							paren_level -= 1;
							if (!paren_level) {
								end_term = offset + $m.length;
								out = whole_string.slice(begin_term, end_term);
								begin_term = end_term;
							}
						} else if ($1 && !paren_level && !quote_level) {
							end_term = offset;
							out = whole_string.slice(begin_term, end_term);
							begin_term = end_term + $m.length;
						} else if ($5 && !quote_level) {
							end_term = whole_string.length;
							out = whole_string.slice(begin_term, end_term);
							begin_term = end_term + $m.length;
						}

						if (out) { arr.push(out); };
						return $m;
					};

				rst = str.replace(rex, rfn);
				return arr;
			},

			evaluate_term = function (term) {
				var rtn,
					arr,
					fun,
					arg = [];
				if (/\D/g.test(term)) {
					if (/^\(.*\)$/.test(term)) {
						if (term.slice(1, -1)) {
							arr = separate_terms(term.slice(1, -1));
							fun = arr.shift();
							while (arr.length) {
								arg.push(evaluate_term(arr.shift()));
							}
							if (lisp_fns.hasOwnProperty(fun)) {
								if (typeof lisp_fns[fun] === "function") {
									rtn = lisp_fns[fun](arg);
								}
							} else {
								// TODO: What if there is no such function?
							}
						} else {
							// If parentheses are empty.
							rtn = "NIL";
						}
					} else if (/^".*"$/g.test(term)) {
						console.log(term);
						rtn = term;
					}
				} else {
					rtn = +term;
				}
				return rtn;
			},

			// Top-level processing of input.
			process_input = function (input, callback_each_term) {
				var rtn,
					arr = separate_terms(input),
					rst;

				while (arr.length) {
					// Extract first term from array and evaluate.
					rst = evaluate_term(arr.shift());
					// Do something with the input and results.
					callback_each_term(input, print_result(rst));
					// Reset the input. We have already done something with it once.
					input = "";
				}

				return rtn;
			},

			print_result = function (result) {
				var rtn = result;
				if (typeof result === "number") {
					rtn = "" + result;
				}
				return rtn;
			},
			
			f;
		
		// Wrap predefined lisp functions in error-checking function.
		for (f in lisp_fns) {
			if (lisp_fns.hasOwnProperty(f)) {
				lisp_fns[f] = wrap_function(lisp_fns[f]);
			}
		}
		
		initialise_callback();

		return {
			process_input: process_input
		};

	};

// Node JS compatibility
if (typeof exports !== "undefined") {
	exports.init = init;
}