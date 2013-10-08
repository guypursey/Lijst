var lisp_interpreter = require("./lisp_interpreter.js").init( function () { console.log("Interpreter loaded..."); } ),
	test_array = [
		{
			"c": "Test basic addition.",
			"t": "(+ 5 5)",
			"r": ["10"]
		},
		{
			"c": "Test multiple commands in one line.",
			"t": "(+ 5 5)(+ 5 3)",
			"r": ["10", "8"]
		},
		{
			"c": "Test multiplication.",
			"t": "(* 5 5)",
			"r": ["25"]
		}
	],
	failure_stack = [],
	test_worth = 100 / test_array.length;
	

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
						failure_stack.push(test_array.length, result);
					}
				},
			rst = lisp_interpreter.process_input(test_element.t, callback_each_term);
	})();
}

console.log((100 - (test_worth * failure_stack.length)) + "% PASSED");

if (failure_stack.length) {
	console.log(failure_stack.length + " FAILURES:");
	console.log(failure_stack);
}