var test_folder = "./test_units/",
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
					}
				}
				return (cache[whichFlag] = cache[whichFlag] || false);
			})();
		};
	})(),
	report_on_failure_stack = function (test_unit_worth, failure_stack) {
		console.log((100 - (test_unit_worth * failure_stack.length)) + "% PASSED");
		console.log(failure_stack ? (failure_stack.length + " FAILURES:") : " ");
		failure_stack.forEach(function (item) {
			console.log(item);
		});
		console.log(" ");
		return true;
	};

test_units.forEach(function(test_unit) {
		var lisp_interpreter = require("./lisp_interpreter.js").init(function () { console.log("Interpreter loaded..."); }),
			test_array = require(test_folder + test_unit),
			test_unit_worth = 100 / test_array.length,
			failure_stack = [];
		
		console.log("Testing: " + test_unit);
		
		test_array.forEach(function (test_element, index, array) { 
			var result_index = 0;
			lisp_interpreter.process_input(test_element.t, function (input, result) {
				var expected_result = test_element.r[result_index];
				if (check_flag("v")) {
					console.log("> " + input);
					console.log("Expecting: " + expected_result);
					console.log(result);
					console.log((expected_result === result) ? "PASSED" : "FAILED");
				}
				if (expected_result !== result) {
					failure_stack.push(
						"TEST " + index + " FAILED: " + test_element.c +
						"\nEXPECTED RESULT " + result_index + ": " + test_element.r[result_index] +
						"\nRECEIVED RESULT " + result_index + ": " + result
					);
				}
				result_index += 1;
			});
		});
		
		report_on_failure_stack(test_unit_worth, failure_stack);
		
});