#Lijst

##v0.0.4

This version is very basic and allows addition, subtraction, multiplication, and division and two basic variables: `T` and `NIL`. It also allows definition of new variables and does some basic error handling. At the moment the project is more along the lines of a proof-of-concept (though it doesn't prove much).

It is bundled with a NodeJS-dependent automated tester and test units. This is to check for bugs quickly as the project develops and to drive development forward (with tests that are initially written to fail).

###What?

**Lijst** (pronounced a bit like *liced*, from the Dutch) is a Lisp emulator (sort of). It provides a console in the browser, similar in appearance to the one seen in genuine Common Lisp programs.

This project makes no great claims in terms of originality or novel ideas. In fact by its very nature, this project is derivative; it is an exercise in retro-computing. All it does is try to replicate as near as possible the Common Lisp console within a browser window, with no additional features or frills, using 100% JavaScript for its logic.

Other examples of projects like this include [js-lisp](https://github.com/willurd/js-lisp), [Lisp.js](https://github.com/arian/LISP.js), and [SLip](http://lisperator.net/slip/) (not to be confused with Joseph Weizenbaum's 1963 language). There are also Lisp to JavaScript converters (such as [Parenscript](http://common-lisp.net/project/parenscript/)) and you can find [here](http://ceaude.twoticketsplease.de/js-lisps.html) a whole list of JavaScript Lisp Implementations which may be of interest.

###Why?

The language Lisp, which this code attempts to emulate, takes its name from the phrase "List Processing". This project is called "Lijst" which, if treated as an acronym, fully expands to "**L**ist processing **i**n a **J**ava**S**cript-based **t**erminal". However, the name is also taken from the Dutch language, where it means "list" and "picture frame", both appropriation connotations for a list processor and an emulator. I started the project for fun to teach myself more thoroughly about Lisp and to improve my JavaScript skills.

###How?

In coding Lisp's functions as JavaScript, I am thinking very literally about what each function does. This code acts as a translation between a very modern language which lots of people use, and a very old language. It also helps in thinking about the functional programming paradigm. Crockford once described JavaScript as "Lisp in C's clothing".

