var lisp_interpreter = require("./lisp_interpreter.js").init( function () { console.log("Interpreter loaded..."); } ),
	test_folder = "./test_units/",
	test_units = require(test_folder + "_test_units"),
	check_flag = (function () {
		var cache = {},
			flags = process.argv.slice(2);
		return function (whichFlag) {
			return cache[whichFlag] || (function () {
				var i = flags.length,
					isFlag = new RegExp("\\-\\w*?" + whichFlag);
				while (i && !cache.hasOwnProperty(whichFlag)) {
					i -= 1;
					if (isFlag.test(flags[i])) {
						cache[whichFlag] = true;
					};
				};
				return (cache[whichFlag] = cache[whichFlag] || false);
			})();
		};
	})(),
	report_on_failure_stack = function (test_unit_worth, failure_stack) {
		var i = 0,
			l = failure_stack.length;
		console.log((100 - (test_unit_worth * l)) + "% PASSED");
		console.log(l ? (l + " FAILURES:") : " ");
		for (; i < l; i += 1) {
			console.log(failure_stack[i]);
		}
		console.log(" ");
	};

while (test_units.length) {
	(function () {
		var test_unit = test_units.shift(),
			test_array = require(test_folder + test_unit),
			test_unit_worth = 100 / test_array.length,
			failure_stack = [];
		
		console.log("Testing: " + test_unit);
		
		while (test_array.length) {
			(function (test_element) {
				var callback_each_term = function (input, result) {
						var expected_result = test_element.r.shift();
						if (check_flag("v")) {
							console.log("> " + input);
							console.log("Expecting: " + expected_result);
							console.log(result);
							console.log((expected_result === result) ? "PASSED" : "FAILED");
						}
						if (expected_result !== result) {
							failure_stack.push(((test_array.length)) + ": " + result);
						}
					},
					rst = lisp_interpreter.process_input(test_element.t, callback_each_term);
			})(test_array.shift());
		};
		
		report_on_failure_stack(test_unit_worth, failure_stack);
		
	})();
};



