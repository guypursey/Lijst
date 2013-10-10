var lisp_interpreter = require("./lisp_interpreter.js").init( function () { console.log("Interpreter loaded..."); } ),
	test_folder = "./test_units/",
	test_units = require(test_folder + "_test_units");

//console.log(process.argv);
while (test_units.length) {
	(function () {
		var test_array = require(test_folder + test_units.shift()),
			test_unit_worth = 100 / test_array.length,
			failure_stack = [];
			
		while (test_array.length) {
			(function () {
				var test_element = test_array.shift(),
					callback_each_term = function (input, result) {
							var expected_result = test_element.r.shift();
							console.log("> " + input);
							console.log("Expecting: " + expected_result);
							console.log(result);
							console.log((expected_result === result) ? "PASSED" : "FAILED");
							if (expected_result !== result) {
								failure_stack.push(((test_array.length)) + ": " + result);
							}
						},
					rst = lisp_interpreter.process_input(test_element.t, callback_each_term);
			})();
		};
		
		console.log((100 - (test_unit_worth * failure_stack.length)) + "% PASSED");
		if (failure_stack.length) {
			console.log(failure_stack.length + " FAILURES:");
			console.log(failure_stack);
		}
	})();
};



