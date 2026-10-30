// lessons.js - Complete curriculum with culminating Capstone Applications Suite
// Full 58-lesson expanded curriculum: Foundations (1-6), Control Flow & Mini Projects (7-14),
// Memory Architecture (15), Object-Oriented C++ (16-20), Intermediate Systems & CLI (21-23),
// Extended Foundations & Practice (24-35), Extended OOP & Memory (36-38), Systems Architecture (39-40),
// Modern STL Systems (41-44), Modern Memory & Safety (45-47), Generic Programming (48-50),
// Modern C++ Idioms (51), Advanced Engineering (52-54), and Culminating Capstones (55-58).

const LESSONS_DATA = [
  {
    "id": "01-setup-compilation",
    "category": "Foundations",
    "fileSlug": "01_setup_and_basics",
    "title": "1. Setup & How C++ Works",
    "summary": "Understand the C++ compilation pipeline, how source code turns into an executable binary, and configure your local workspace.",
    "cBridge": "In C, compilers such as `gcc` are used to compile object files and link them. In C++, `g++` or `clang++` is used. C++ introduces name mangling behind the scenes so that functions can be overloaded with the same name but distinct parameters.",
    "content": "\n<h3>What is C++?</h3>\n\n<p>C++ is a high-performance, compiled, general-purpose programming language created by Bjarne Stroustrup in 1979 as an extension of the C programming language. It is widely used in game engines, operating systems, financial systems, embedded systems, and web browsers where execution speed and direct memory control are critical.</p>\n\n<h3>The Compilation Lifecycle</h3>\n\n<p>Unlike interpreted languages that execute code line by line at runtime, C++ source code must be translated into native machine instructions before execution. This build lifecycle consists of four main phases:</p>\n\n<ol>\n\n  <li><strong>Preprocessing:</strong> Directives starting with <code>#</code> (such as <code>#include</code> and <code>#define</code>) are evaluated. Preprocessor directives copy header files directly into the source translation unit and replace macro definitions.</li>\n\n  <li><strong>Compilation:</strong> The preprocessed source code is checked for syntactic and semantic correctness and translated into assembly code tailored to the target CPU architecture.</li>\n\n  <li><strong>Assembly:</strong> The assembler translates assembly language instructions into machine-readable object files containing native binary instructions.</li>\n\n  <li><strong>Linking:</strong> The linker stitches object files together with compiled standard library functions into a standalone executable binary.</li>\n\n</ol>\n\n<h3>Writing and Compiling from the Command Line</h3>\n\n<p>Source code is compiled from the terminal using a C++ compiler:</p>\n\n<pre><code>g++ -std=c++17 -Wall main.cpp -o my_program\n./my_program</code></pre>\n",
    "starterCode": "// 01_setup_and_basics.cpp\n#include <iostream>\n\nint main() {\n    std::cout << \"C++ compiler is verified and ready!\" << std::endl;\n    return 0;\n}",
    "explanation": "The `#include <iostream>` header supplies standard input and output stream declarations. The `main` function is the mandatory entry point of the executable. `std::cout` outputs the string literal to the console, while `std::endl` appends a newline and flushes the buffer.",
    "quiz": {
      "question": "Which toolchain component combines object files with library code to generate the executable file?",
      "options": [
        "The Preprocessor",
        "The Assembler",
        "The Linker",
        "The Interpreter"
      ],
      "answer": 2,
      "explanation": "The Linker resolves external symbols and stitches object code together with compiled standard library routines."
    },
    "fillBlank": {
      "instructions": "Complete the preprocessor directive and standard output stream identifier:",
      "codeTemplate": "#___1___ <iostream>\n\nint main() {\n    std::___2___ << \"Hello C++!\" << std::endl;\n    return 0;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "include",
          "hint": "Directive to import header contents"
        },
        {
          "id": 2,
          "answer": "cout",
          "hint": "Standard output stream object"
        }
      ]
    }
  },
  {
    "id": "02-anatomy-of-a-program",
    "category": "Foundations",
    "fileSlug": "02_program_anatomy",
    "title": "2. Anatomy of a C++ Program",
    "summary": "Deconstruct the core skeleton of every C++ program: headers, namespaces, main, and console output.",
    "cBridge": "In C, `<stdio.h>` is included and `printf(\"Hello %s\\n\", name)` is called. In C++, `<iostream>` is included and stream insertion operators are used: `std::cout << \"Hello \" << name << '\\n';`. C++ streams are type-safe and eliminate the need for `%d` or `%s` specifiers.",
    "content": "\n<h3>Dissecting 'Hello World'</h3>\n\n<p>Every C++ program relies on a standardized structural foundation.</p>\n\n<pre><code>#include &lt;iostream&gt;\nusing namespace std;\n\nint main() {\n    cout &lt;&lt; \"Hello, World!\" &lt;&lt; endl;\n    return 0;\n}</code></pre>\n\n<p>The components perform the following roles:</p>\n\n<ul>\n\n  <li><code>#include &lt;iostream&gt;</code>: Instructs the preprocessor to pull in standard input and output stream primitives.</li>\n\n  <li><code>using namespace std;</code>: Brings standard library symbols into the local scope so <code>cout</code> can be written without the <code>std::</code> prefix. In production codebases, qualifying symbols as <code>std::cout</code> is preferred to prevent namespace pollution.</li>\n\n  <li><code>int main()</code>: The required entry point of execution. The <code>int</code> return type passes an exit code back to the operating system.</li>\n\n  <li><code>cout &lt;&lt; \"...\" &lt;&lt; endl;</code>: <code>cout</code> represents character output. The <code>&lt;&lt;</code> stream insertion operator feeds string data into the stream. <code>endl</code> adds a newline and flushes stream buffers.</li>\n\n  <li><code>return 0;</code>: Signals success to the operating system.</li>\n\n</ul>\n",
    "starterCode": "// 02_program_anatomy.cpp\n#include <iostream>\n\nint main() {\n    std::cout << \"Welcome to C++!\" << std::endl;\n    std::cout << \"Learning modern C++ step-by-step.\" << std::endl;\n    return 0;\n}",
    "explanation": "`std::cout` chains output items sequentially using the `<<` insertion operator. Each statement terminates with a semicolon.",
    "quiz": {
      "question": "What is the purpose of the `<<` operator when used alongside `std::cout`?",
      "options": [
        "Bitwise left shift on text data",
        "Stream insertion operator feeding data into the console stream",
        "Relational less-than comparison",
        "Memory allocation operator"
      ],
      "answer": 1,
      "explanation": "C++ overloads `<<` for standard output streams as the stream insertion operator."
    },
    "fillBlank": {
      "instructions": "Complete the namespace declaration and newline stream manipulator:",
      "codeTemplate": "#include <iostream>\nusing ___1___ std;\n\nint main() {\n    cout << \"First line\" << ___2___;\n    return 0;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "namespace",
          "hint": "Keyword grouping identifiers into scope"
        },
        {
          "id": 2,
          "answer": "endl",
          "hint": "Stream manipulator inserting newline and flushing buffer"
        }
      ]
    }
  },
  {
    "id": "03-variables-and-data-types",
    "category": "Foundations",
    "fileSlug": "03_variables_and_types",
    "title": "3. Variables & Core Data Types",
    "summary": "Master fundamental data types: integers, floating-point numbers, characters, booleans, and modern strings.",
    "cBridge": "In C, character arrays (`char name[50]`) or raw character pointers required careful handling of null terminators (`'\\0'`) and buffer bounds. C++ provides `std::string`, which dynamically manages its own memory buffer securely.",
    "content": "\n<h3>Storing Data in Memory</h3>\n\n<p>A variable represents a named region of storage in RAM. C++ is statically typed, meaning every variable must be declared with an explicit data type before use.</p>\n\n<h3>Core Primitive Types</h3>\n\n<ul>\n\n  <li><code>int</code>: Stores signed integers, typically allocated 4 bytes in memory.</li>\n\n  <li><code>double</code>: Represents 64-bit double-precision floating-point numbers.</li>\n\n  <li><code>char</code>: Holds a single 8-bit character enclosed in single quotes (<code>'A'</code>).</li>\n\n  <li><code>bool</code>: Represents truth values, storing either <code>true</code> or <code>false</code>.</li>\n\n  <li><code>std::string</code>: Represents dynamic character text sequences, requiring <code>#include &lt;string&gt;</code>.</li>\n\n</ul>\n\n<h3>Variable Declaration and Initialisation</h3>\n\n<p>Modern C++ encourages uniform braced initialisation (<code>int age{25};</code>), which prevents narrow implicit conversions at compile time.</p>\n",
    "starterCode": "// 03_variables_and_types.cpp\n#include <iostream>\n#include <string>\n\nint main() {\n    std::string characterName{\"Ada\"};\n    int characterAge{35};\n    double gpa{3.92};\n    bool isStudent{true};\n\n    std::cout << \"Name: \" << characterName << \"\\n\";\n    std::cout << \"Age: \" << characterAge << \"\\n\";\n    std::cout << \"GPA: \" << gpa << \"\\n\";\n    std::cout << \"Student status: \" << isStudent << std::endl;\n\n    return 0;\n}",
    "explanation": "Braced initialisers instantiate `characterName` as an `std::string` and `characterAge` as an integer. Printing `isStudent` displays `1` for `true`.",
    "quiz": {
      "question": "Which modern C++ type provides automated memory management for text strings?",
      "options": [
        "`char*`",
        "`std::string`",
        "`char[]`",
        "`std::text`"
      ],
      "answer": 1,
      "explanation": "`std::string` manages dynamic memory allocation for character strings safely and automatically."
    },
    "fillBlank": {
      "instructions": "Declare a double-precision floating point number and a boolean variable using uniform initialisation:",
      "codeTemplate": "#include <iostream>\n\nint main() {\n    ___1___ gpa{3.95};\n    ___2___ isGraduated{true};\n    std::cout << \"GPA: \" << gpa << \" Status: \" << isGraduated << std::endl;\n    return 0;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "double",
          "hint": "Floating-point data type"
        },
        {
          "id": 2,
          "answer": "bool",
          "hint": "Boolean truth type"
        }
      ]
    }
  },
  {
    "id": "04-working-with-strings",
    "category": "Foundations",
    "fileSlug": "04_working_with_strings",
    "title": "4. Working with Strings",
    "summary": "Learn essential string methods: length, character indexing, searching with find(), and slicing with substr().",
    "cBridge": "In C, string handling required header functions from `<string.h>` such as `strlen()`, `strstr()`, and `strncpy()`. In C++, `std::string` is an object with built-in member methods accessed via dot notation (`phrase.length()`, `phrase.find()`).",
    "content": "\n<h3>Modern C++ String Mechanics</h3>\n\n<p><code>std::string</code> encapsulates character sequences with built-in memory management and member methods.</p>\n\n<h3>Essential Member Methods</h3>\n\n<ul>\n\n  <li><strong>Concatenation:</strong> Strings are joined using the <code>+</code> operator.</li>\n\n  <li><strong>Length:</strong> <code>.length()</code> or <code>.size()</code> returns the total character count.</li>\n\n  <li><strong>Element Access:</strong> Subscript syntax <code>[index]</code> or <code>.at(index)</code> accesses individual characters. <code>.at()</code> performs bounds checking.</li>\n\n  <li><strong>Searching (<code>.find()</code>):</strong> Searches for a substring and returns the starting index, or <code>std::string::npos</code> if not found.</li>\n\n  <li><strong>Substring (<code>.substr(start, length)</code>):</strong> Returns a new string slice starting at <code>start</code> containing <code>length</code> characters.</li>\n\n</ul>\n",
    "starterCode": "// 04_working_with_strings.cpp\n#include <iostream>\n#include <string>\n\nint main() {\n    std::string phrase{\"Giraffe Academy\"};\n\n    std::cout << \"Original: \" << phrase << \"\\n\";\n    std::cout << \"Length: \" << phrase.length() << \"\\n\";\n    std::cout << \"First character: \" << phrase[0] << \"\\n\";\n\n    std::size_t foundIdx = phrase.find(\"Academy\");\n    if (foundIdx != std::string::npos) {\n        std::cout << \"'Academy' starts at index: \" << foundIdx << \"\\n\";\n        std::string sub = phrase.substr(foundIdx, 7);\n        std::cout << \"Extracted substring: \" << sub << std::endl;\n    }\n\n    return 0;\n}",
    "explanation": "`.find(\"Academy\")` returns index `8`. `.substr(8, 7)` extracts 7 characters starting from index `8`, returning `\"Academy\"`.",
    "quiz": {
      "question": "Given `std::string s{\"Computer\"};`, what is returned by `s.substr(3, 4)`?",
      "options": [
        "`\"put\"`",
        "`\"pute\"`",
        "`\"comp\"`",
        "`\"puter\"`"
      ],
      "answer": 1,
      "explanation": "Index 3 is `'p'`. Taking 4 characters yields `'p'`, `'u'`, `'t'`, `'e'`, resulting in `\"pute\"`."
    },
    "fillBlank": {
      "instructions": "Call member functions to obtain the length and extract a 5-character substring starting at index 0:",
      "codeTemplate": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string lang{\"CPlusPlus\"};\n    int len = lang.___1___();\n    std::string prefix = lang.___2___(0, 5);\n    std::cout << \"Len: \" << len << \" Prefix: \" << prefix << std::endl;\n    return 0;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "length",
          "hint": "Member function returning character count"
        },
        {
          "id": 2,
          "answer": "substr",
          "hint": "Member function to extract a string slice"
        }
      ]
    }
  },
  {
    "id": "05-numbers-and-math",
    "category": "Foundations",
    "fileSlug": "05_numbers_and_math",
    "title": "5. Numbers & Math Operations",
    "summary": "Explore integer division, precedence, type conversion, and common mathematical functions in <cmath>.",
    "cBridge": "In C++, as in C, integer division truncates decimal remainders (`10 / 3` evaluates to `3`). To preserve floating-point accuracy, cast operands explicitly using `static_cast<double>(a) / b`.",
    "content": "\n<h3>Arithmetic Operations & Integer Truncation</h3>\n\n<p>C++ supports fundamental arithmetic operators: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and <code>%</code> (modulo). When two integer operands are divided, integer truncation drops any fractional portion.</p>\n\n<h3>The <code>&lt;cmath&gt;</code> Library</h3>\n\n<p>Including <code>&lt;cmath&gt;</code> grants access to standard mathematical routines:</p>\n\n<ul>\n\n  <li><code>std::pow(base, exp)</code>: Computes exponentiation.</li>\n\n  <li><code>std::sqrt(x)</code>: Computes square roots.</li>\n\n  <li><code>std::round(x)</code>, <code>std::ceil(x)</code>, <code>std::floor(x)</code>: Perform numeric rounding operations.</li>\n\n  <li><code>std::max(a, b)</code>, <code>std::min(a, b)</code>: Return the maximum or minimum value.</li>\n\n</ul>\n",
    "starterCode": "// 05_numbers_and_math.cpp\n#include <iostream>\n#include <cmath>\n\nint main() {\n    int a{10};\n    int b{3};\n\n    std::cout << \"Integer division: \" << (a / b) << \"\\n\";\n    std::cout << \"Floating division: \" << (static_cast<double>(a) / b) << \"\\n\";\n    std::cout << \"Remainder (10 % 3): \" << (a % b) << \"\\n\";\n    std::cout << \"2^3: \" << std::pow(2, 3) << \"\\n\";\n    std::cout << \"Square root of 64: \" << std::sqrt(64) << std::endl;\n\n    return 0;\n}",
    "explanation": "`10 / 3` evaluates to `3` due to integer division. `static_cast<double>(a) / b` converts `a` to a floating-point number before division, producing `3.33333`.",
    "quiz": {
      "question": "What is the result of `7 / 2` in C++?",
      "options": [
        "`3.5`",
        "`3`",
        "`4`",
        "`3.0`"
      ],
      "answer": 1,
      "explanation": "Both operands are integers, causing truncation of the fractional remainder."
    },
    "fillBlank": {
      "instructions": "Include the standard mathematics header and compute $3^4$:",
      "codeTemplate": "#include <iostream>\n#include <___1___>\n\nint main() {\n    std::cout << \"3^4 = \" << ___2___(3, 4) << std::endl;\n    return 0;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "cmath",
          "hint": "Standard C++ math header"
        },
        {
          "id": 2,
          "answer": "pow",
          "hint": "Exponentiation function"
        }
      ]
    }
  },
  {
    "id": "06-getting-user-input",
    "category": "Foundations",
    "fileSlug": "06_user_input",
    "title": "6. Getting User Input (cin & getline)",
    "summary": "Capture interactive user input from the console with cin and handle full lines containing spaces using getline().",
    "cBridge": "In C, `scanf(\"%d\", &age)` required memory addresses and left unread newlines in `stdin`. In C++, `std::cin >> age` extracts primitive data automatically without addresses. For strings containing whitespace, `std::getline(std::cin, str)` replaces `gets()` or `fgets()`.",
    "content": "\n<h3>Extracting Primitive Data with <code>std::cin</code></h3>\n\n<p>Console input is captured using <code>std::cin</code> alongside the stream extraction operator <code>&gt;&gt;</code>. The <code>&gt;&gt;</code> operator skips leading whitespace and parses numeric or character data into destination variables.</p>\n\n<h3>Reading Full Sentences with <code>std::getline</code></h3>\n\n<p>Using <code>std::cin &gt;&gt; name</code> on a string stops reading as soon as whitespace is encountered. To capture an entire line including spaces, use <code>std::getline(std::cin, stringVariable)</code>.</p>\n\n<h3>Buffer Management (<code>std::cin.ignore()</code>)</h3>\n\n<p>When switching from numeric extraction (<code>std::cin &gt;&gt; age</code>) to <code>std::getline</code>, a leftover newline character (<code>'\\n'</code>) remains in the input buffer. <code>std::getline</code> immediately reads this character and completes without waiting for user typing. Calling <code>std::cin.ignore()</code> discards this lingering newline character.</p>\n",
    "starterCode": "// 06_user_input.cpp\n#include <iostream>\n#include <string>\n\nint main() {\n    int age{0};\n    std::string fullName{};\n\n    std::cout << \"Enter your age: \";\n    std::cin >> age;\n\n    // Clear lingering newline buffer before getline\n    std::cin.ignore();\n\n    std::cout << \"Enter your full name: \";\n    std::getline(std::cin, fullName);\n\n    std::cout << \"Welcome, \" << fullName << \"! You are \" << age << \" years old.\" << std::endl;\n    return 0;\n}",
    "explanation": "`std::cin >> age` parses the integer. `std::cin.ignore()` flushes the newline from the buffer, permitting `std::getline` to wait for and read the entire full name string.",
    "quiz": {
      "question": "Why does `std::cin >> name` fail to capture `\"Jane Doe\"` completely?",
      "options": [
        "`std::cin` has a 4-character limit",
        "The `>>` operator halts reading when it encounters whitespace",
        "`std::string` cannot hold space characters in C++",
        "`std::cin` only works for numbers"
      ],
      "answer": 1,
      "explanation": "The stream extraction operator `>>` treats whitespace as a token delimiter. `std::getline` must be used to read entire lines containing spaces."
    },
    "fillBlank": {
      "instructions": "Complete the stream extraction operator and function call to capture numeric and line-based input:",
      "codeTemplate": "#include <iostream>\n#include <string>\n\nint main() {\n    int id;\n    std::string title;\n    std::cin ___1___ id;\n    std::cin.ignore();\n    ___2___(std::cin, title);\n    return 0;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": ">>",
          "hint": "Stream extraction operator"
        },
        {
          "id": 2,
          "answer": "getline",
          "hint": "Function reading a full line from an input stream"
        }
      ]
    }
  },
  {
    "id": "07-mini-projects-calculator-madlibs",
    "category": "Control Flow & Projects",
    "fileSlug": "07_calculator_and_madlibs",
    "title": "7. Building Mini Projects: Calculator & Mad Libs",
    "summary": "Put input, output, strings, and math together to build a functional addition calculator and a Mad Libs word game.",
    "cBridge": "In C, string formatting required `sprintf()` into fixed-size buffers, carrying buffer overflow risks. In C++, standard streams and `std::string` dynamic allocation make text formatting memory-safe.",
    "content": "\n<h3>Synthesising Basics into Console Applications</h3>\n\n<p>Combining stream extraction, mathematical evaluation, and string interpolation allows developers to build functional interactive utilities.</p>\n\n<h3>Project 1: Arithmetic Addition Calculator</h3>\n\n<p>Captures two floating-point numbers from user input, evaluates their sum, and outputs formatted results to the terminal.</p>\n\n<h3>Project 2: Mad Libs Game</h3>\n\n<p>Gathers creative word substitutions (colours, plural nouns, names) using <code>std::getline</code> and injects them into a pre-structured prose story.</p>\n",
    "starterCode": "// 07_calculator_and_madlibs.cpp\n#include <iostream>\n#include <string>\n\nint main() {\n    std::cout << \"=== Addition Calculator ===\\n\";\n    double num1{0.0}, num2{0.0};\n    std::cout << \"Enter first number: \";\n    std::cin >> num1;\n    std::cout << \"Enter second number: \";\n    std::cin >> num2;\n    std::cout << \"Sum: \" << (num1 + num2) << \"\\n\\n\";\n\n    std::cin.ignore(); // Flush newline buffer\n\n    std::cout << \"=== Mad Libs Story Game ===\\n\";\n    std::string colour{}, pluralNoun{}, celebrity{};\n\n    std::cout << \"Enter a colour: \";\n    std::getline(std::cin, colour);\n    std::cout << \"Enter a plural noun: \";\n    std::getline(std::cin, pluralNoun);\n    std::cout << \"Enter a celebrity name: \";\n    std::getline(std::cin, celebrity);\n\n    std::cout << \"\\nRoses are \" << colour << \"\\n\";\n    std::cout << pluralNoun << \" are blue\\n\";\n    std::cout << \"I love \" << celebrity << std::endl;\n\n    return 0;\n}",
    "explanation": "The program demonstrates sequential execution. Input variables capture user data, buffer clearing prevents skipped input lines, and string concatenation outputs the formatted game output.",
    "quiz": {
      "question": "Which variable type should be selected for calculator inputs that require floating-point decimal precision?",
      "options": [
        "`int`",
        "`char`",
        "`double`",
        "`std::string`"
      ],
      "answer": 2,
      "explanation": "`double` provides 64-bit precision for fractional and decimal computations."
    },
    "fillBlank": {
      "instructions": "Complete the stream insertion operators and variable declarations to calculate the product of two inputs:",
      "codeTemplate": "#include <iostream>\n\nint main() {\n    ___1___ num1{0.0}, num2{0.0};\n    std::cin >> num1 >> num2;\n    std::cout ___2___ \"Product: \" << (num1 * num2) << std::endl;\n    return 0;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "double",
          "hint": "Floating-point precision data type"
        },
        {
          "id": 2,
          "answer": "<<",
          "hint": "Stream insertion operator for output"
        }
      ]
    }
  },
  {
    "id": "08-arrays",
    "category": "Control Flow & Projects",
    "fileSlug": "08_arrays",
    "title": "8. Arrays (Fixed Size Containers)",
    "summary": "Store and access ordered collections of elements in contiguous memory using C++ fixed-size arrays.",
    "cBridge": "Raw arrays in C++ share the identical memory layout as C arrays: contiguous elements stored without built-in bounds checking. Modern C++ also introduces `std::array` and `std::vector`, but understanding raw array syntax remains fundamental.",
    "content": "\n<h3>Contiguous Memory Collections</h3>\n\n<p>An array is a fixed-size contiguous sequence of elements of identical data types allocated sequentially in memory.</p>\n\n<h3>Indexing & Boundary Safety</h3>\n\n<p>Arrays use zero-based indexing. An array allocated with $N$ elements possesses valid indices spanning $0$ to $N - 1$. Accessing an element beyond these valid limits results in undefined behaviour or memory corruption because raw arrays do not perform automated bounds checking.</p>\n",
    "starterCode": "// 08_arrays.cpp\n#include <iostream>\n\nint main() {\n    int luckyNums[6]{4, 8, 15, 16, 23, 42};\n\n    std::cout << \"Element at index 0: \" << luckyNums[0] << \"\\n\";\n\n    luckyNums[0] = 100;\n    std::cout << \"Modified index 0: \" << luckyNums[0] << \"\\n\";\n    std::cout << \"Element at index 4: \" << luckyNums[4] << std::endl;\n\n    return 0;\n}",
    "explanation": "`luckyNums[0]` accesses the first element. Assigning `luckyNums[0] = 100` mutates the memory location directly in $O(1)$ constant time.",
    "quiz": {
      "question": "Given `int arr[5]{10, 20, 30, 40, 50};`, what value is evaluated by `arr[2]`?",
      "options": [
        "`10`",
        "`20`",
        "`30`",
        "`40`"
      ],
      "answer": 2,
      "explanation": "Arrays are zero-indexed. Index `0` holds `10`, index `1` holds `20`, and index `2` holds `30`."
    },
    "fillBlank": {
      "instructions": "Complete the array declaration size and subscript access index for a 3-element array:",
      "codeTemplate": "#include <iostream>\n\nint main() {\n    int primes[___1___]{2, 3, 5};\n    std::cout << \"Last element: \" << primes[___2___] << std::endl;\n    return 0;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "3",
          "hint": "Total element count allocated"
        },
        {
          "id": 2,
          "answer": "2",
          "hint": "Zero-based subscript index of the third element"
        }
      ]
    }
  },
  {
    "id": "09-functions",
    "category": "Control Flow & Projects",
    "fileSlug": "09_functions_and_returns",
    "title": "9. Functions & Return Values",
    "summary": "Organize reusable blocks of code, pass arguments, return values, and use function declarations.",
    "cBridge": "In C, functions passed parameters strictly by value or using raw pointers (`void swap(int *a, int *b)`). C++ introduces references (`void swap(int &a, int &b)`), enabling in-place mutation without pointer dereferencing syntax.",
    "content": "\n<h3>Modularizing Code Execution</h3>\n\n<p>A function is a named reusable block of statements designed to perform a distinct task. Functions promote readability, reduce duplication, and facilitate automated unit testing.</p>\n\n<h3>Function Declarations & Prototypes</h3>\n\n<p>Because C++ compiles translation units top-to-bottom, invoking a function prior to its complete definition requires declaring a function prototype above <code>main</code>.</p>\n\n<h3>Return Types & Parameters</h3>\n\n<p>Functions specify parameter lists and explicit return types. Functions that perform side effects without yielding values declare a <code>void</code> return type.</p>\n",
    "starterCode": "// 09_functions_and_returns.cpp\n#include <iostream>\n#include <string>\n\n// Function prototypes\ndouble cube(double num);\nvoid greetUser(const std::string& name);\n\nint main() {\n    greetUser(\"Ada\");\n    double result = cube(5.0);\n    std::cout << \"5 cubed is: \" << result << std::endl;\n    return 0;\n}\n\nvoid greetUser(const std::string& name) {\n    std::cout << \"Hello, \" << name << \"!\" << \"\\n\";\n}\n\ndouble cube(double num) {\n    return num * num * num;\n}",
    "explanation": "The prototype declarations notify the compiler of signature information. In `main`, `cube(5.0)` evaluates $5.0^3 = 125.0$ and returns the double result.",
    "quiz": {
      "question": "What occurs if a function is called in `main` prior to its definition without a preceding forward prototype?",
      "options": [
        "The program compiles normally",
        "A compilation error is raised stating the identifier was not declared in scope",
        "The function returns zero automatically",
        "Execution runs in parallel"
      ],
      "answer": 1,
      "explanation": "C++ requires symbols to be declared in scope before invocation. Prototypes provide necessary signature metadata."
    },
    "fillBlank": {
      "instructions": "Complete the return type and return keyword for an addition function:",
      "codeTemplate": "___1___ addNumbers(int a, int b) {\n    ___2___ a + b;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "int",
          "hint": "Data type yielded by function calculation"
        },
        {
          "id": 2,
          "answer": "return",
          "hint": "Keyword passing result back to caller"
        }
      ]
    }
  },
  {
    "id": "10-if-statements",
    "category": "Control Flow & Projects",
    "fileSlug": "10_if_statements",
    "title": "10. If Statements & Logical Operators",
    "summary": "Make decisions in your code using conditional branching, boolean evaluation, and logical operators.",
    "cBridge": "In C89, conditional logic relied on integer non-zero values due to the absence of a native boolean type. C++ provides first-class `bool` primitives with `true` and `false` literals, alongside short-circuit logical operators (`&&`, `||`, `!`).",
    "content": "\n<h3>Conditional Branching Mechanics</h3>\n\n<p><code>if</code> statements execute distinct statement blocks depending on whether evaluated conditions yield <code>true</code> or <code>false</code>.</p>\n\n<h3>Relational & Logical Operators</h3>\n\n<ul>\n\n  <li>Relational operators compare values: <code>==</code> (equality), <code>!=</code> (inequality), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.</li>\n\n  <li>Logical AND (<code>&amp;&amp;</code>): Returns <code>true</code> only when both operands evaluate to <code>true</code>.</li>\n\n  <li>Logical OR (<code>||</code>): Returns <code>true</code> if at least one operand evaluates to <code>true</code>.</li>\n\n  <li>Logical NOT (<code>!</code>): Negates a boolean truth value.</li>\n\n</ul>\n\n<h3>Short-Circuit Evaluation</h3>\n\n<p>Logical expressions evaluate left to right. In an <code>&amp;&amp;</code> chain, evaluation halts immediately if any operand yields <code>false</code>. In an <code>||</code> chain, evaluation halts if any operand yields <code>true</code>.</p>\n",
    "starterCode": "// 10_if_statements.cpp\n#include <iostream>\n\nint getMax(int num1, int num2, int num3) {\n    if (num1 >= num2 && num1 >= num3) {\n        return num1;\n    } else if (num2 >= num1 && num2 >= num3) {\n        return num2;\n    } else {\n        return num3;\n    }\n}\n\nint main() {\n    std::cout << \"Max of (4, 10, 2): \" << getMax(4, 10, 2) << \"\\n\";\n    std::cout << \"Max of (15, 3, 9): \" << getMax(15, 3, 9) << std::endl;\n    return 0;\n}",
    "explanation": "`getMax` compares three integers using relational operators joined by logical AND (`&&`). Execution branches into `else if` and `else` blocks based on truth values.",
    "quiz": {
      "question": "What value is produced by evaluating `(true && !false)`?",
      "options": [
        "`false`",
        "`true`",
        "`0`",
        "Undefined"
      ],
      "answer": 1,
      "explanation": "`!false` evaluates to `true`. Thus `true && true` evaluates to `true`."
    },
    "fillBlank": {
      "instructions": "Fill in the logical AND operator and logical negation operator:",
      "codeTemplate": "if (hasKey ___1___ ___2___isDoorLocked) {\n    std::cout << \"Enter room\\n\";\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "&&",
          "hint": "Logical AND operator"
        },
        {
          "id": 2,
          "answer": "!",
          "hint": "Logical negation operator"
        }
      ]
    }
  },
  {
    "id": "11-switch-statements",
    "category": "Control Flow & Projects",
    "fileSlug": "11_switch_statements",
    "title": "11. Switch Statements",
    "summary": "Simplify multi-way branching against integer and character constants using switch and case blocks.",
    "cBridge": "`switch` statements in C++ maintain identical fall-through semantics as C. Explicit `break` statements are required to prevent unintended execution of subsequent `case` blocks.",
    "content": "\n<h3>Discrete Expression Branching</h3>\n\n<p>A <code>switch</code> statement simplifies multi-way branching when comparing a single integer or character variable against constant expression values.</p>\n\n<h3>Mechanics & Fall-Through Rules</h3>\n\n<ul>\n\n  <li>The switch expression must evaluate to an integral or enumeration type.</li>\n\n  <li>Each <code>case</code> value must be a compile-time constant expression.</li>\n\n  <li>When a matching <code>case</code> is encountered, execution proceeds sequentially until a <code>break</code> statement or function return is reached. Omitting <code>break</code> results in fall-through execution into downstream cases.</li>\n\n</ul>\n",
    "starterCode": "// 11_switch_statements.cpp\n#include <iostream>\n#include <string>\n\nstd::string getDayOfWeek(int dayNum) {\n    switch (dayNum) {\n        case 0: return \"Sunday\";\n        case 1: return \"Monday\";\n        case 2: return \"Tuesday\";\n        case 3: return \"Wednesday\";\n        case 4: return \"Thursday\";\n        case 5: return \"Friday\";\n        case 6: return \"Saturday\";\n        default: return \"Invalid Day Number\";\n    }\n}\n\nint main() {\n    std::cout << \"Day 2: \" << getDayOfWeek(2) << \"\\n\";\n    std::cout << \"Day 5: \" << getDayOfWeek(5) << \"\\n\";\n    std::cout << \"Day 9: \" << getDayOfWeek(9) << std::endl;\n    return 0;\n}",
    "explanation": "`getDayOfWeek` matches `dayNum` against case labels. Because `return` exits the function immediately, explicit `break` statements are not strictly required in this returning structure.",
    "quiz": {
      "question": "What occurs if a `case` block omits an explicit `break` statement?",
      "options": [
        "The compiler raises a syntax error",
        "Execution continues into subsequent case statements (fall-through)",
        "The program terminates immediately",
        "The default block executes automatically"
      ],
      "answer": 1,
      "explanation": "Without `break` or `return`, control falls through into following case labels regardless of their expression values."
    },
    "fillBlank": {
      "instructions": "Complete the syntax for matching a character constant and terminating the case branch:",
      "codeTemplate": "switch (op) {\n    ___1___ '+':\n        std::cout << (a + b);\n        ___2___;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "case",
          "hint": "Keyword matching a discrete constant value"
        },
        {
          "id": 2,
          "answer": "break",
          "hint": "Control flow statement terminating switch execution"
        }
      ]
    }
  },
  {
    "id": "12-loops-while-for",
    "category": "Control Flow & Projects",
    "fileSlug": "12_loops",
    "title": "12. Loops: While, Do-While & For",
    "summary": "Automate repetitive execution using while loops, post-test do-while loops, and indexed for loops.",
    "cBridge": "Loop constructs operate identically to C. Modern C++ also introduces range-based `for` loops (`for (const auto& elem : container)`), simplifying container traversal without index tracking.",
    "content": "\n<h3>Iterative Control Structures</h3>\n\n<p>Loops automate repeated statement execution while boolean continuation conditions hold true.</p>\n\n<h3>Loop Variants</h3>\n\n<ul>\n\n  <li><strong><code>while</code> loop:</strong> Pre-test loop that checks its condition before executing the loop body.</li>\n\n  <li><strong><code>do-while</code> loop:</strong> Post-test loop that checks its condition after executing the body, guaranteeing at least one execution iteration.</li>\n\n  <li><strong><code>for</code> loop:</strong> Consolidates initialisation, continuation condition testing, and iteration updates into a unified construct (<code>for (int i{0}; i &lt; 10; ++i)</code>).</li>\n\n</ul>\n",
    "starterCode": "// 12_loops.cpp\n#include <iostream>\n\nint main() {\n    std::cout << \"--- While Loop ---\\n\";\n    int w{1};\n    while (w <= 3) {\n        std::cout << \"w = \" << w << \"\\n\";\n        ++w;\n    }\n\n    std::cout << \"\\n--- For Loop ---\\n\";\n    int nums[5]{10, 20, 30, 40, 50};\n    for (int i{0}; i < 5; ++i) {\n        std::cout << \"nums[\" << i << \"] = \" << nums[i] << \"\\n\";\n    }\n\n    return 0;\n}",
    "explanation": "The `while` loop checks `w <= 3` before each iteration. The `for` loop initialises index `i` to `0`, tests `i < 5`, and increments `++i` after each loop iteration.",
    "quiz": {
      "question": "How does a `do-while` loop differ fundamentally from a standard `while` loop?",
      "options": [
        "A `do-while` loop cannot use integer counters",
        "A `do-while` loop evaluates its condition post-iteration, guaranteeing at least one execution",
        "A `do-while` loop executes faster",
        "A `while` loop has no conditional check"
      ],
      "answer": 1,
      "explanation": "The `do-while` loop evaluates continuation conditions at the bottom of the loop block."
    },
    "fillBlank": {
      "instructions": "Complete the loop header to iterate index `i` from 0 up to 4:",
      "codeTemplate": "___1___ (int i{0}; i < 5; i___2___) {\n    std::cout << i << std::endl;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "for",
          "hint": "Counting loop keyword"
        },
        {
          "id": 2,
          "answer": "++",
          "hint": "Increment operator"
        }
      ]
    }
  },
  {
    "id": "13-guessing-game-project",
    "category": "Control Flow & Projects",
    "fileSlug": "13_guessing_game",
    "title": "13. Building an Interactive Guessing Game",
    "summary": "Synthesize loops, conditionals, and state tracking to build a full terminal guessing game with attempt limits.",
    "cBridge": "Tracking state using explicit boolean flags (`bool outOfGuesses{false}`) in C++ replaces old C integer flag patterns (`0` or `1`), clarifying code intent.",
    "content": "\n<h3>State Machine Loop Architecture</h3>\n\n<p>Game loops maintain state across repeated turns. In an interactive guessing game, loop execution continues while the user has remaining attempts and has not discovered the target value.</p>\n\n<h3>Loop Termination Conditions</h3>\n\n<p>The loop terminates under two distinct conditions: success (the guess matches the secret value) or failure (the remaining attempt counter reaches zero).</p>\n",
    "starterCode": "// 13_guessing_game.cpp\n#include <iostream>\n\nint main() {\n    const int secretNum{7};\n    int guess{0};\n    int guessCount{0};\n    const int guessLimit{3};\n    bool outOfGuesses{false};\n\n    std::cout << \"=== Guessing Game (3 Attempts) ===\\n\";\n\n    while (secretNum != guess && !outOfGuesses) {\n        if (guessCount < guessLimit) {\n            std::cout << \"Enter guess: \";\n            std::cin >> guess;\n            ++guessCount;\n        } else {\n            outOfGuesses = true;\n        }\n    }\n\n    if (outOfGuesses) {\n        std::cout << \"Out of tries! Game Over.\" << std::endl;\n    } else {\n        std::cout << \"Congratulations! You won in \" << guessCount << \" tries!\" << std::endl;\n    }\n\n    return 0;\n}",
    "explanation": "The `while` loop checks `secretNum != guess && !outOfGuesses`. If `guessCount` exceeds `guessLimit`, `outOfGuesses` is set to `true`, breaking the loop and printing loss feedback.",
    "quiz": {
      "question": "Which logical condition keeps a game loop executing while the guess is incorrect AND attempts remain?",
      "options": [
        "`while (secretNum == guess || outOfGuesses)`",
        "`while (secretNum != guess && !outOfGuesses)`",
        "`while (guessCount == guessLimit)`",
        "`while (true)`"
      ],
      "answer": 1,
      "explanation": "The loop continues only while the guess is NOT correct AND the player is NOT out of attempts."
    },
    "fillBlank": {
      "instructions": "Complete the compound continuation condition for the guessing game loop:",
      "codeTemplate": "while (secretNum != guess ___1___ ___2___outOfGuesses) {\n    // Game loop logic\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "&&",
          "hint": "Logical AND operator"
        },
        {
          "id": 2,
          "answer": "!",
          "hint": "Logical NOT operator"
        }
      ]
    }
  },
  {
    "id": "14-2d-arrays-nested-loops",
    "category": "Control Flow & Projects",
    "fileSlug": "14_2d_arrays_nested_loops",
    "title": "14. 2D Arrays & Nested Loops",
    "summary": "Work with multi-dimensional matrices and learn how nested loops traverse grid data row-by-row.",
    "cBridge": "Two-dimensional arrays in C++ are stored in contiguous memory in row-major order, identical to C. Modern C++ often utilizes `std::vector<std::vector<T>>` for dynamic grids, but row-major index iteration remains the standard traversal pattern.",
    "content": "\n<h3>Multi-Dimensional Grid Storage</h3>\n\n<p>A two-dimensional array represents a grid structured into rows and columns (<code>int grid[3][3]</code>).</p>\n\n<h3>Row-Major Layout & Nesting</h3>\n\n<p>C++ stores two-dimensional arrays in row-major order: all column elements for row 0 reside sequentially in memory, followed by column elements for row 1. Outer loops iterate over rows while inner loops iterate over columns to align with CPU memory caches.</p>\n",
    "starterCode": "// 14_2d_arrays_nested_loops.cpp\n#include <iostream>\n\nint main() {\n    int grid[3][3]{\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n\n    std::cout << \"Traversing 3x3 Grid (Row-Major):\\n\";\n    for (int row{0}; row < 3; ++row) {\n        for (int col{0}; col < 3; ++col) {\n            std::cout << grid[row][col] << \"\\t\";\n        }\n        std::cout << \"\\n\";\n    }\n\n    return 0;\n}",
    "explanation": "The outer `row` loop sets the target row, while the inner `col` loop prints column items left-to-right. `\t` adds tabular spacing, and `std::cout << \"\n\"` starts a new row.",
    "quiz": {
      "question": "How many total integers are allocated in memory by `int matrix[4][5];`?",
      "options": [
        "`9`",
        "`20`",
        "`25`",
        "`16`"
      ],
      "answer": 1,
      "explanation": "$4 \text{ rows} \times 5 \text{ columns} = 20 \text{ total integer elements}$."
    },
    "fillBlank": {
      "instructions": "Declare a two-dimensional array with 2 rows and 3 columns:",
      "codeTemplate": "int matrix[___1___][___2___]{ {1, 2, 3}, {4, 5, 6} };",
      "blanks": [
        {
          "id": 1,
          "answer": "2",
          "hint": "Number of rows"
        },
        {
          "id": 2,
          "answer": "3",
          "hint": "Number of columns"
        }
      ]
    }
  },
  {
    "id": "15-pointers-and-memory",
    "category": "Memory Architecture",
    "fileSlug": "15_pointers_and_memory",
    "title": "15. Pointers & Memory Addresses",
    "summary": "Demystify physical RAM addresses, pointer types, the address-of operator (&), and dereferencing (*).",
    "cBridge": "C and C++ share identical raw pointer mechanics (`&` to take an address, `*` to dereference). However, C++ introduces references (`int &ref = x`), which act as non-null aliases, and smart pointers (`std::unique_ptr`), which automate memory deallocation via RAII.",
    "content": "\n<h3>Physical RAM Addresses</h3>\n\n<p>Every variable allocated in memory resides at a unique hexadecimal address. The address-of operator (<code>&amp;</code>) extracts a variable's location in RAM.</p>\n\n<h3>Raw Pointer Variables</h3>\n\n<p>A pointer is a variable that stores the memory address of another variable. Pointers are declared using an asterisk (<code>int* ptr = &amp;var;</code>).</p>\n\n<h3>Dereferencing Pointers</h3>\n\n<p>The dereference operator (<code>*</code>) accesses or modifies the value stored at the target memory address held by a pointer.</p>\n",
    "starterCode": "// 15_pointers_and_memory.cpp\n#include <iostream>\n\nint main() {\n    int age{19};\n    int* pAge{&age};\n\n    std::cout << \"Variable value: \" << age << \"\\n\";\n    std::cout << \"Memory address (&age): \" << pAge << \"\\n\";\n    std::cout << \"Dereferenced value (*pAge): \" << *pAge << \"\\n\";\n\n    *pAge = 21; // Mutate value stored at address\n    std::cout << \"Modified age value: \" << age << \"\\n\";\n\n    // C++ Reference demonstration\n    int& ageRef{age};\n    ageRef = 30;\n    std::cout << \"Modified age via reference: \" << age << std::endl;\n\n    return 0;\n}",
    "explanation": "`pAge` stores `&age`. Dereferencing `*pAge` reads `19`. Reassigning `*pAge = 21` directly mutates `age` in RAM. `ageRef` binds an alias to `age`.",
    "quiz": {
      "question": "Given `int x{42}; int* p = &x;`, what is produced by evaluating `*p`?",
      "options": [
        "The hexadecimal address of `x`",
        "`42`",
        "The memory address of `p`",
        "`nullptr`"
      ],
      "answer": 1,
      "explanation": "The dereference operator `*p` fetches the value stored at the address held in `p`."
    },
    "fillBlank": {
      "instructions": "Assign the memory address of `num` into pointer `ptr` and dereference it:",
      "codeTemplate": "int num{100};\nint* ptr = ___1___num;\nstd::cout << ___2___ptr << std::endl;",
      "blanks": [
        {
          "id": 1,
          "answer": "&",
          "hint": "Address-of operator"
        },
        {
          "id": 2,
          "answer": "",
          "hint": ""
        }
      ]
    }
  },
  {
    "id": "16-classes-and-objects",
    "category": "Object-Oriented C++",
    "fileSlug": "16_classes_and_objects",
    "title": "16. Classes & Objects",
    "summary": "Transition from procedural to object-oriented programming. Create custom data models with attributes and instances.",
    "cBridge": "In C, custom structures were built using `typedef struct { ... } Book;`. In C++, a `class` encapsulates both data attributes and member methods with access controls (`public`, `private`).",
    "content": "\n<h3>Object-Oriented Paradigm</h3>\n\n<p>Object-oriented programming packages related data attributes and operating behaviours into custom user-defined types.</p>\n\n<h3>Classes vs Objects</h3>\n\n<ul>\n\n  <li><strong>Class:</strong> The blueprint or schematic defining structure and member behaviours.</li>\n\n  <li><strong>Object:</strong> A concrete instance allocated in memory created according to that class blueprint.</li>\n\n</ul>\n\n<h3>Default Access Controls</h3>\n\n<p>Class members default to <code>private</code> access in C++. <code>struct</code> members default to <code>public</code> access.</p>\n",
    "starterCode": "// 16_classes_and_objects.cpp\n#include <iostream>\n#include <string>\n\nclass Book {\npublic:\n    std::string title;\n    std::string author;\n    int pages{0};\n};\n\nint main() {\n    Book book1;\n    book1.title = \"Harry Potter\";\n    book1.author = \"J.K. Rowling\";\n    book1.pages = 500;\n\n    Book book2;\n    book2.title = \"Lord of the Rings\";\n    book2.author = \"J.R.R. Tolkien\";\n    book2.pages = 700;\n\n    std::cout << book1.title << \" by \" << book1.author << \" (\" << book1.pages << \" pages)\\n\";\n    std::cout << book2.title << \" by \" << book2.author << \" (\" << book2.pages << \" pages)\" << std::endl;\n\n    return 0;\n}",
    "explanation": "`book1` and `book2` are distinct instances of `Book`. Each instance owns independent memory allocations for `title`, `author`, and `pages`.",
    "quiz": {
      "question": "What is the default access specifier for members inside a C++ `class` if left unspecified?",
      "options": [
        "`public`",
        "`private`",
        "`protected`",
        "`global`"
      ],
      "answer": 1,
      "explanation": "Class members default to `private` access, whereas `struct` members default to `public` access."
    },
    "fillBlank": {
      "instructions": "Complete the class definition keywords and access specifier:",
      "codeTemplate": "___1___ Car {\n___2___:\n    int speed{0};\n};",
      "blanks": [
        {
          "id": 1,
          "answer": "class",
          "hint": "Keyword defining a custom class type"
        },
        {
          "id": 2,
          "answer": "public",
          "hint": "Access specifier granting external visibility"
        }
      ]
    }
  },
  {
    "id": "17-constructors",
    "category": "Object-Oriented C++",
    "fileSlug": "17_constructors",
    "title": "17. Constructors & Initialisation Lists",
    "summary": "Automate object initialisation when instances are created and support multiple creation patterns with overloading.",
    "cBridge": "In C, struct initialisation required helper functions (`create_book()`) or `memset()`. In C++, constructors run automatically upon instantiation, establishing valid invariants before object use.",
    "content": "\n<h3>Constructor Lifecycle Mechanics</h3>\n\n<p>A constructor is a special member function that shares the exact name of its class and possesses no return type. Constructors execute automatically when an object is instantiated.</p>\n\n<h3>Member Initialiser Lists</h3>\n\n<p>Modern C++ uses member initialiser lists (<code>Book(...) : title{t}, pages{p} {}</code>) rather than assignment statements inside constructor bodies. Initialiser lists directly construct member variables, avoiding double construction overhead.</p>\n",
    "starterCode": "// 17_constructors.cpp\n#include <iostream>\n#include <string>\n\nclass Book {\npublic:\n    std::string title;\n    std::string author;\n    int pages;\n\n    // Parameterised constructor using member initialiser list\n    Book(std::string aTitle, std::string aAuthor, int aPages)\n        : title{aTitle}, author{aAuthor}, pages{aPages} {\n        std::cout << \"Initialised book: \" << title << \"\\n\";\n    }\n\n    // Default overloaded constructor\n    Book() : title{\"Untitled\"}, author{\"Anonymous\"}, pages{0} {}\n};\n\nint main() {\n    Book book1{\"1984\", \"George Orwell\", 328};\n    Book emptyBook;\n\n    std::cout << emptyBook.title << \" (\" << emptyBook.pages << \" pages)\" << std::endl;\n    return 0;\n}",
    "explanation": "The parameterised constructor uses an initialiser list to construct `title`, `author`, and `pages`. `emptyBook` invokes the default constructor overload.",
    "quiz": {
      "question": "Which rule applies strictly to C++ constructors?",
      "options": [
        "Constructors must return an integer exit code",
        "Constructors share the class name and have no return type",
        "Constructors must be called explicitly using the `->` operator",
        "Classes are limited to a single constructor"
      ],
      "answer": 1,
      "explanation": "Constructors share the class identifier, declare no return type, and may be overloaded."
    },
    "fillBlank": {
      "instructions": "Complete the constructor declaration header for class `User`:",
      "codeTemplate": "class User {\npublic:\n    std::string name;\n    ___1___(std::string aName) : name{aName} {}\n};",
      "blanks": [
        {
          "id": 1,
          "answer": "User",
          "hint": "Constructor name matching class identifier"
        }
      ]
    }
  },
  {
    "id": "18-object-functions",
    "category": "Object-Oriented C++",
    "fileSlug": "18_object_functions",
    "title": "18. Object Functions (Member Methods)",
    "summary": "Add behaviour to your classes. Learn how member methods access object state to compute results and perform actions.",
    "cBridge": "In C, functions were external entities accepting struct pointers (`student_has_honors(&s)`). In C++, methods reside inside the class and implicitly access instance fields via the implicit `this` pointer.",
    "content": "\n<h3>Encapsulating Behaviours</h3>\n\n<p>Classes package data fields alongside member methods that operate upon those fields to compute values or alter object state.</p>\n\n<h3>Implicit <code>this</code> Pointer</h3>\n\n<p>When a member method executes, it receives an implicit hidden pointer named <code>this</code> referencing the invoking object instance.</p>\n",
    "starterCode": "// 18_object_functions.cpp\n#include <iostream>\n#include <string>\n\nclass Student {\npublic:\n    std::string name;\n    double gpa;\n\n    Student(std::string aName, double aGpa)\n        : name{aName}, gpa{aGpa} {}\n\n    bool hasHonors() const {\n        return gpa >= 3.5;\n    }\n};\n\nint main() {\n    Student s1{\"Jim\", 2.4};\n    Student s2{\"Pam\", 3.6};\n\n    std::cout << s1.name << \" honors: \" << (s1.hasHonors() ? \"Yes\" : \"No\") << \"\\n\";\n    std::cout << s2.name << \" honors: \" << (s2.hasHonors() ? \"Yes\" : \"No\") << std::endl;\n\n    return 0;\n}",
    "explanation": "`s1.hasHonors()` inspects `s1.gpa` (`2.4`), returning `false`. `s2.hasHonors()` inspects `s2.gpa` (`3.6`), returning `true`. Marking `hasHonors() const` guarantees it will not alter object state.",
    "quiz": {
      "question": "How does a member method identify which object's fields to evaluate?",
      "options": [
        "By evaluating global variables",
        "Via an implicit `this` pointer passed to the method",
        "By reading command line arguments",
        "By instantiating a new copy"
      ],
      "answer": 1,
      "explanation": "Member methods receive an implicit `this` pointer pointing to the specific instance on which the method was invoked."
    },
    "fillBlank": {
      "instructions": "Call member method `drive` on object instance `myCar`:",
      "codeTemplate": "Car myCar;\nmyCar___1___drive();",
      "blanks": [
        {
          "id": 1,
          "answer": ".",
          "hint": "Member access dot operator"
        }
      ]
    }
  },
  {
    "id": "19-getters-and-setters",
    "category": "Object-Oriented C++",
    "fileSlug": "19_getters_and_setters",
    "title": "19. Getters, Setters & Encapsulation",
    "summary": "Protect your data with private access specifiers, control mutation, and prevent corrupted state.",
    "cBridge": "In C, struct fields are public and open to arbitrary external modification. In C++, encapsulation restricts member field visibility using `private` access specifiers, controlling access through getter and setter methods.",
    "content": "\n<h3>Data Encapsulation</h3>\n\n<p>Encapsulation packages data fields and operating methods together while restricting direct access to internal representation.</p>\n\n<h3>Member Validation in Setters</h3>\n\n<p>Mutator methods (setters) validate input constraints before updating private fields, preventing objects from entering corrupted states. Read-only accessor methods (getters) return private field values without permitting external mutation.</p>\n",
    "starterCode": "// 19_getters_and_setters.cpp\n#include <iostream>\n#include <string>\n\nclass Movie {\nprivate:\n    std::string rating;\n\npublic:\n    std::string title;\n    std::string director;\n\n    Movie(std::string aTitle, std::string aDirector, std::string aRating)\n        : title{aTitle}, director{aDirector} {\n        setRating(aRating);\n    }\n\n    void setRating(const std::string& aRating) {\n        if (aRating == \"G\" || aRating == \"PG\" || aRating == \"PG-13\" || aRating == \"R\") {\n            rating = aRating;\n        } else {\n            rating = \"NR\";\n        }\n    }\n\n    std::string getRating() const {\n        return rating;\n    }\n};\n\nint main() {\n    Movie avengers{\"The Avengers\", \"Joss Whedon\", \"PG-13\"};\n    avengers.setRating(\"Dog\"); // Invalid rating attempt\n\n    std::cout << \"Movie: \" << avengers.title << \"\\n\";\n    std::cout << \"Validated Rating: \" << avengers.getRating() << std::endl;\n\n    return 0;\n}",
    "explanation": "`rating` is marked `private`. `setRating(\"Dog\")` fails input validation checks, assigning default fallback `\"NR\"`. Accessing `getRating()` retrieves `\"NR\"`.",
    "quiz": {
      "question": "What primary architectural benefit is supplied by data encapsulation?",
      "options": [
        "Faster execution speed",
        "Protection of internal object invariants against invalid external mutation",
        "Reduced binary output file sizes",
        "Automatic garbage collection"
      ],
      "answer": 1,
      "explanation": "Encapsulation prevents invalid mutations by restricting direct external access to private fields."
    },
    "fillBlank": {
      "instructions": "Declare a private field and a public accessor method:",
      "codeTemplate": "class Account {\n___1___:\n    double balance{0.0};\n___2___:\n    double getBalance() const { return balance; }\n};",
      "blanks": [
        {
          "id": 1,
          "answer": "private",
          "hint": "Access specifier hiding internal fields"
        },
        {
          "id": 2,
          "answer": "public",
          "hint": "Access specifier exposing methods externally"
        }
      ]
    }
  },
  {
    "id": "20-inheritance",
    "category": "Object-Oriented C++",
    "fileSlug": "20_inheritance",
    "title": "20. Inheritance & Method Overriding",
    "summary": "Establish hierarchical class relationships, inherit base properties, and specialize derived class behaviours.",
    "cBridge": "In C, code reuse relied on embedding nested sub-structs. C++ provides native class inheritance syntax (`class Derived : public Base`), establishing IS-A relationships automatically.",
    "content": "\n<h3>Class Hierarchies & Code Reuse</h3>\n\n<p>Inheritance enables a derived class to inherit member fields and methods from a parent base class, establishing an IS-A relationship hierarchy.</p>\n\n<h3>Access Specifiers in Inheritance</h3>\n\n<ul>\n\n  <li><code>public</code>: Derived classes inherit base public members with public visibility.</li>\n\n  <li><code>protected</code>: Base fields are hidden from external callers but accessible within derived classes.</li>\n\n  <li><code>private</code>: Base fields are inaccessible to derived classes.</li>\n\n</ul>\n\n<h3>Method Overriding</h3>\n\n<p>Derived classes can re-implement methods defined in base classes to specialize behaviour.</p>\n",
    "starterCode": "// 20_inheritance.cpp\n#include <iostream>\n\nclass Chef {\npublic:\n    void makeChicken() const {\n        std::cout << \"The chef makes chicken.\\n\";\n    }\n    void makeSpecialDish() const {\n        std::cout << \"The chef makes bbq ribs.\\n\";\n    }\n};\n\n// ItalianChef inherits from Chef\nclass ItalianChef : public Chef {\npublic:\n    void makePasta() const {\n        std::cout << \"The chef makes pasta.\\n\";\n    }\n    // Overriding base method\n    void makeSpecialDish() const {\n        std::cout << \"The chef makes chicken parm.\\n\";\n    }\n};\n\nint main() {\n    Chef chef;\n    chef.makeSpecialDish();\n\n    ItalianChef italianChef;\n    italianChef.makeChicken(); // Inherited\n    italianChef.makeSpecialDish(); // Overridden\n\n    return 0;\n}",
    "explanation": "`ItalianChef` inherits `makeChicken()` from `Chef`. `ItalianChef` overrides `makeSpecialDish()`, replacing base behaviour with `\"chicken parm\"`.",
    "quiz": {
      "question": "Which inheritance mode preserves public base members as public in the derived class?",
      "options": [
        "`private`",
        "`protected`",
        "`public`",
        "`virtual`"
      ],
      "answer": 2,
      "explanation": "`public` inheritance maintains base public interface members as public in the derived class."
    },
    "fillBlank": {
      "instructions": "Complete the inheritance syntax establishing `Dog` as a subclass of `Animal`:",
      "codeTemplate": "class Animal {\npublic:\n    void eat() {}\n};\n\nclass Dog : ___1___ Animal {\npublic:\n    void bark() {}\n};",
      "blanks": [
        {
          "id": 1,
          "answer": "public",
          "hint": "Access specifier for public inheritance"
        }
      ]
    }
  },
  {
    "id": "21-structs-modulo-time",
    "category": "Intermediate Systems & CLI",
    "fileSlug": "21_time_calculations_and_structs",
    "title": "21. Structs, Modulo & Time Calculations",
    "summary": "Model custom data records using C++ structs and apply modulo arithmetic to compute calendar and time conversions.",
    "cBridge": "In C, declaring a struct required writing `struct Time t1;` or using `typedef`. In C++, struct tags automatically become type names (`Time t1;`). C++ structs also support member methods and constructors.",
    "content": "\n<h3>Data Grouping with <code>struct</code></h3>\n\n<p>A <code>struct</code> is a lightweight composite data type where members default to <code>public</code> visibility. Structs are ideal for Plain Old Data (POD) record types that aggregate related fields without complex invariants.</p>\n\n<h3>Modulo Arithmetic in Time Calculations</h3>\n\n<p>The modulo operator (<code>%</code>) calculates remainder integer values, making it ideal for cyclic mathematical operations such as converting total seconds into hours, minutes, and remaining seconds ($3600 \text{ seconds/hour}$, $60 \text{ seconds/minute}$).</p>\n",
    "starterCode": "// 21_time_calculations_and_structs.cpp\n#include <iostream>\n\nstruct TimeRecord {\n    int hours{0};\n    int minutes{0};\n    int seconds{0};\n};\n\nTimeRecord convertSeconds(int totalSeconds) {\n    TimeRecord record;\n    record.hours = totalSeconds / 3600;\n    int remaining = totalSeconds % 3600;\n    record.minutes = remaining / 60;\n    record.seconds = remaining % 60;\n    return record;\n}\n\nint main() {\n    int total{3665}; // 1 hour, 1 minute, 5 seconds\n    TimeRecord t = convertSeconds(total);\n\n    std::cout << total << \" seconds = \" \n              << t.hours << \"h \" << t.minutes << \"m \" << t.seconds << \"s\\n\";\n\n    return 0;\n}",
    "explanation": "`convertSeconds` divides `totalSeconds` by $3600$ to obtain hours. The remainder operator (`% 3600`) isolates remaining seconds, which are converted into minutes and seconds.",
    "quiz": {
      "question": "What is evaluated by `3665 % 60`?",
      "options": [
        "`61`",
        "`5`",
        "`1`",
        "`0`"
      ],
      "answer": 1,
      "explanation": "$3665 = (60 \times 61) + 5$, so the remainder evaluated by `%` is $5$."
    },
    "fillBlank": {
      "instructions": "Complete the modulo operation calculating remaining seconds after extracting full minutes:",
      "codeTemplate": "int totalSecs = 125;\nint minutes = totalSecs / 60;\nint remSecs = totalSecs ___1___ 60;",
      "blanks": [
        {
          "id": 1,
          "answer": "%",
          "hint": "Modulo remainder operator"
        }
      ]
    }
  },
  {
    "id": "22-ansi-terminal-graphics",
    "category": "Intermediate Systems & CLI",
    "fileSlug": "22_ansi_colors_and_terminal_art",
    "title": "22. ANSI Terminal Art & 24-Bit TrueColor",
    "summary": "Render 24-bit TrueColor terminal graphics and CLI user interfaces using ANSI escape sequences.",
    "cBridge": "Rendering ANSI graphics relies on formatted escape codes written to stdout. In C++, `std::cout` outputs escape sequences seamlessly using string literals and stream insertion.",
    "content": "\n<h3>Terminal Escape Sequences</h3>\n\n<p>ANSI escape sequences are special string command codes starting with the ESC character (<code>\\x1b</code> or <code>\\033</code>) that instruct terminal emulators to reposition the cursor, clear screens, or alter text background/foreground colours.</p>\n\n<h3>24-Bit RGB TrueColor Syntax</h3>\n\n<p>Modern terminals support 24-bit RGB TrueColor using the escape format:</p>\n\n<ul>\n\n  <li>Foreground: <code>\\x1b[38;2;R;G;Bm</code></li>\n\n  <li>Background: <code>\\x1b[48;2;R;G;Bm</code></li>\n\n  <li>Reset formatting: <code>\\x1b[0m</code></li>\n\n</ul>\n",
    "starterCode": "// 22_ansi_colors_and_terminal_art.cpp\n#include <iostream>\n\nvoid printTrueColorPixel(int r, int g, int b) {\n    // Print background RGB block\n    std::cout << \"\\x1b[48;2;\" << r << \";\" << g << \";\" << b << \"m  \\x1b[0m\";\n}\n\nint main() {\n    std::cout << \"=== 24-Bit TrueColor ANSI Gradient ===\\n\\n\";\n\n    for (int r{0}; r <= 255; r += 32) {\n        for (int g{0}; g <= 255; g += 32) {\n            printTrueColorPixel(r, g, 128);\n        }\n        std::cout << \"\\n\";\n    }\n\n    return 0;\n}",
    "explanation": "`printTrueColorPixel` writes `\\x1b[48;2;R;G;Bm` to apply background color `(r, g, b)`. It prints two spaces and sends `\\x1b[0m` to reset formatting.",
    "quiz": {
      "question": "Which ANSI sequence resets terminal background and text formatting back to defaults?",
      "options": [
        "`\\x1b[2J`",
        "`\\x1b[0m`",
        "`\\x1b[38m`",
        "`\\x1b[1K`"
      ],
      "answer": 1,
      "explanation": "`\\x1b[0m` resets all color and style attributes to terminal defaults."
    },
    "fillBlank": {
      "instructions": "Complete the ANSI 24-bit foreground color escape code prefix:",
      "codeTemplate": "#include <iostream>\n\nvoid setRGBForeground(int r, int g, int b) {\n    std::cout << \"\\x1b[___1___;2;\" << r << \";\" << g << \";\" << b << \"m\";\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "38",
          "hint": "ANSI code for foreground RGB text color"
        }
      ]
    }
  },
  {
    "id": "23-stl-vectors-and-random",
    "category": "Intermediate Systems & CLI",
    "fileSlug": "23_stl_vectors_and_random",
    "title": "23. STL Vectors & Modern Random Engines",
    "summary": "Transition to modern dynamic vectors and generate pseudo-random numbers using the <random> library engine.",
    "cBridge": "In C, random numbers relied on `rand()` and `srand(time(NULL))`, which produced low-quality distributions. Modern C++ deprecates `rand()` in favor of `<random>` engines like `std::mt19937` paired with explicit distribution objects.",
    "content": "\n<h3>Dynamic Arrays with <code>std::vector</code></h3>\n\n<p><code>std::vector</code> is a dynamic sequence container that resizes automatically when elements are added (<code>.push_back()</code>). Elements are stored in contiguous memory allocations.</p>\n\n<h3>Modern Pseudo-Random Number Generation</h3>\n\n<p>The <code>&lt;random&gt;</code> header provides high-quality random number generation:</p>\n\n<ul>\n\n  <li><code>std::random_device</code>: Non-deterministic hardware entropy source used to seed generator engines.</li>\n\n  <li><code>std::mt19937</code>: Mersenne Twister pseudo-random generator engine.</li>\n\n  <li><code>std::uniform_int_distribution&lt;int&gt;</code>: Maps engine bits into a specified uniform integer range <code>[min, max]</code>.</li>\n\n</ul>\n",
    "starterCode": "// 23_stl_vectors_and_random.cpp\n#include <iostream>\n#include <vector>\n#include <random>\n\nint main() {\n    std::random_device rd;\n    std::mt19937 gen{rd()};\n    std::uniform_int_distribution<int> dist{1, 100};\n\n    std::vector<int> randomNumbers;\n\n    for (int i{0}; i < 5; ++i) {\n        randomNumbers.push_back(dist(gen));\n    }\n\n    std::cout << \"Generated vector elements:\\n\";\n    for (int num : randomNumbers) {\n        std::cout << num << \" \";\n    }\n    std::cout << std::endl;\n\n    return 0;\n}",
    "explanation": "`std::random_device` seeds Mersenne Twister engine `gen`. `dist(gen)` produces integers uniformly distributed in `[1, 100]`. `randomNumbers.push_back()` appends elements dynamically.",
    "quiz": {
      "question": "Why is `std::mt19937` paired with a distribution object preferred over C-style `rand()`?",
      "options": [
        "`rand()` is unsupported in modern compilers",
        "It produces statistical distributions without modulo bias",
        "`rand()` requires dynamic heap allocation",
        "`<random>` only works with strings"
      ],
      "answer": 1,
      "explanation": "`std::uniform_int_distribution` combined with `std::mt19937` eliminates modulo bias and generates statistical distributions."
    },
    "fillBlank": {
      "instructions": "Declare a uniform integer distribution for dice rolls spanning values 1 to 6:",
      "codeTemplate": "#include <random>\n\nstd::mt19937 gen{1337};\nstd::___1___<int> diceDist{1, 6};\nint roll = diceDist(gen);",
      "blanks": [
        {
          "id": 1,
          "answer": "uniform_int_distribution",
          "hint": "Standard STL uniform integer distribution class"
        }
      ]
    }
  },
  {
    "id": "24-constants-and-type-casting",
    "category": "Foundations Extended",
    "fileSlug": "24_constants_and_casting",
    "title": "24. Constants, Type Casting & Explicit Conversions",
    "summary": "Enforce immutability using const and execute safe type conversions using static_cast.",
    "cBridge": "In C, constants relied on preprocessor macros (`#define MAX 100`), which lack type safety and scope. In C++, `const` and `constexpr` provide typed constants. C-style casts (`(double)x`) are replaced by explicit C++ named cast operators such as `static_cast<double>(x)`.",
    "content": "\n<h3>Immutable Variables with <code>const</code></h3>\n\n<p>Marking a variable <code>const</code> guarantees its value cannot be mutated after initialisation. Attempting reassignment generates a compile-time error.</p>\n\n<h3>Explicit Casting with <code>static_cast</code></h3>\n\n<p>C++ provides explicit named cast operators:</p>\n\n<ul>\n\n  <li><code>static_cast&lt;T&gt;(expr)</code>: Performs compile-time checked type conversions (such as <code>int</code> to <code>double</code>).</li>\n\n  <li><code>const_cast&lt;T&gt;(expr)</code>: Casts away <code>const</code> qualification.</li>\n\n  <li><code>reinterpret_cast&lt;T&gt;(expr)</code>: Performs low-level reinterpretation of object bit patterns.</li>\n\n</ul>\n",
    "starterCode": "// 31_constants_and_casting.cpp\n#include <iostream>\n\nint main() {\n    const double PI{3.1415926535};\n    int radius{5};\n\n    // Explicit type conversion using static_cast\n    double area = PI * static_cast<double>(radius) * static_cast<double>(radius);\n\n    std::cout << \"Circle Area: \" << area << std::endl;\n    return 0;\n}",
    "explanation": "`PI` is declared `const`. `static_cast<double>(radius)` converts integer `radius` explicitly to `double` before multiplication, preventing implicit conversion warnings.",
    "quiz": {
      "question": "Which modern C++ cast operator performs compile-time checked conversions between compatible types?",
      "options": [
        "`reinterpret_cast`",
        "`static_cast`",
        "`dynamic_cast`",
        "`const_cast`"
      ],
      "answer": 1,
      "explanation": "`static_cast` performs checked compile-time conversions between related types."
    },
    "fillBlank": {
      "instructions": "Complete the `static_cast` conversion transforming integer `total` to a `double`:",
      "codeTemplate": "int total = 95;\nint count = 10;\ndouble avg = ___1___<double>(total) / count;",
      "blanks": [
        {
          "id": 1,
          "answer": "static_cast",
          "hint": "Modern C++ explicit conversion operator"
        }
      ]
    }
  },
  {
    "id": "25-constants-input-program",
    "category": "Foundations Extended",
    "fileSlug": "25_bmi_calculator",
    "title": "25. Interactive BMI Calculator Project",
    "summary": "Combine constants, user input, math formulas, and string formatting to build an interactive Body Mass Index calculator.",
    "cBridge": "This exercise combines stream input, `const` thresholds, and `static_cast` into a practical interactive console tool.",
    "content": "\n<h3>Formula Mechanics</h3>\n\n<p>Body Mass Index (BMI) evaluates body mass relative to height:</p>\n\n<p>$$\\text{BMI} = \\frac{\\text{weight\\_kg}}{\\text{height\\_m}^2}$$</p>\n\n<h3>Medical Threshold Constants</h3>\n\n<p>Defining medical category thresholds as <code>const</code> values prevents accidental mutation and keeps code self-documenting.</p>\n",
    "starterCode": "// 32_bmi_calculator.cpp\n#include <iostream>\n#include <string>\n\nint main() {\n    const double UNDERWEIGHT_LIMIT{18.5};\n    const double NORMAL_LIMIT{24.9};\n\n    std::string name{};\n    double weightKg{0.0}, heightM{0.0};\n\n    std::cout << \"Enter full name: \";\n    std::getline(std::cin, name);\n\n    std::cout << \"Enter weight (kg): \";\n    std::cin >> weightKg;\n\n    std::cout << \"Enter height (m): \";\n    std::cin >> heightM;\n\n    double bmi = weightKg / (heightM * heightM);\n\n    std::cout << \"\\n=== BMI Results for \" << name << \" ===\\n\";\n    std::cout << \"Calculated BMI: \" << bmi << \"\\n\";\n\n    if (bmi < UNDERWEIGHT_LIMIT) {\n        std::cout << \"Category: Underweight\\n\";\n    } else if (bmi <= NORMAL_LIMIT) {\n        std::cout << \"Category: Normal weight\\n\";\n    } else {\n        std::cout << \"Category: Overweight\\n\";\n    }\n\n    return 0;\n}",
    "explanation": "`std::getline` captures the full name. `std::cin >> weightKg >> heightM` extracts double precision metrics. The `if` branch compares `bmi` against `const` limit thresholds.",
    "quiz": {
      "question": "Why are threshold values declared using `const` rather than hardcoded magic numbers?",
      "options": [
        "Hardcoded numbers execute slower",
        "`const` identifiers prevent mutation and make code self-documenting",
        "`const` values do not consume RAM",
        "Magic numbers cause compilation errors"
      ],
      "answer": 1,
      "explanation": "Named `const` variables eliminate magic numbers, clarifying code intent and preventing accidental changes."
    },
    "fillBlank": {
      "instructions": "Complete the BMI computation statement:",
      "codeTemplate": "double weight = 70.0;\ndouble height = 1.75;\ndouble bmi = weight / (height ___1___ height);",
      "blanks": [
        {
          "id": 1,
          "answer": "",
          "hint": ""
        }
      ]
    }
  },
  {
    "id": "26-string-comparison-and-methods",
    "category": "Foundations Extended",
    "fileSlug": "26_string_comparison",
    "title": "26. String Comparison & Advanced Member Methods",
    "summary": "Master relational string comparisons, character replacement, and sub-string searching methods.",
    "cBridge": "In C, string comparison required `strcmp(s1, s2) == 0`. In C++, `std::string` overloads relational operators (`==`, `!=`, `<`, `>`) for intuitive lexicographical comparison.",
    "content": "\n<h3>Relational Operators on Strings</h3>\n\n<p><code>std::string</code> overloads relational operators:</p>\n\n<ul>\n\n  <li><code>s1 == s2</code>: Evaluates <code>true</code> if character contents match exactly.</li>\n\n  <li><code>s1 &lt; s2</code>: Evaluates <code>true</code> if <code>s1</code> comes before <code>s2</code> lexicographically.</li>\n\n</ul>\n\n<h3>Advanced String Methods</h3>\n\n<ul>\n\n  <li><code>.compare(other)</code>: Returns <code>0</code> if equal, <code>&lt;0</code> if <code>this</code> is lexicographically smaller, and <code>&gt;0</code> if larger.</li>\n\n  <li><code>.replace(pos, len, str)</code>: Replaces a character slice with new content.</li>\n\n  <li><code>.find_first_of(chars)</code>: Locates the first occurrence of any character from a given set.</li>\n\n</ul>\n",
    "starterCode": "// 33_string_comparison.cpp\n#include <iostream>\n#include <string>\n\nint main() {\n    std::string str1{\"Apple\"};\n    std::string str2{\"Banana\"};\n\n    if (str1 < str2) {\n        std::cout << str1 << \" comes before \" << str2 << \" lexicographically.\\n\";\n    }\n\n    std::string phrase{\"The quick brown fox\"};\n    std::size_t pos = phrase.find(\"brown\");\n    if (pos != std::string::npos) {\n        phrase.replace(pos, 5, \"red\");\n    }\n\n    std::cout << \"Modified phrase: \" << phrase << std::endl;\n    return 0;\n}",
    "explanation": "`str1 < str2` evaluates lexicographical order (`\"Apple\"` < `\"Banana\"`). `phrase.replace(pos, 5, \"red\")` replaces `\"brown\"` with `\"red\"`, yielding `\"The quick red fox\"`.",
    "quiz": {
      "question": "What value is returned by `s1.compare(s2)` when `s1` and `s2` store identical text?",
      "options": [
        "`1`",
        "`0`",
        "`-1`",
        "`std::string::npos`"
      ],
      "answer": 1,
      "explanation": "`.compare()` returns `0` when both strings hold identical character sequences."
    },
    "fillBlank": {
      "instructions": "Complete the equality check comparing two strings:",
      "codeTemplate": "std::string a{\"hello\"};\nstd::string b{\"hello\"};\nif (a ___1___ b) {\n    std::cout << \"Strings match\\n\";\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "==",
          "hint": "Equality relational operator"
        }
      ]
    }
  },
  {
    "id": "27-pass-by-value-vs-reference",
    "category": "Foundations Extended",
    "fileSlug": "27_pass_by_reference",
    "title": "27. Pass-by-Value vs Pass-by-Reference",
    "summary": "Understand memory copying in pass-by-value versus zero-copy mutation and performance in pass-by-reference.",
    "cBridge": "In C, modifying argument values inside functions required passing explicit memory addresses (`void update(int *x)`). C++ references (`void update(int &x)`) eliminate pointer syntax while enabling in-place mutation.",
    "content": "\n<h3>Pass-by-Value</h3>\n\n<p>Pass-by-value copies the argument into a new local parameter variable. Modifications inside the function alter only the local copy, leaving the caller's original variable unchanged.</p>\n\n<h3>Pass-by-Reference (<code>T&amp;</code>)</h3>\n\n<p>Pass-by-reference binds an alias directly to the caller's argument. Modifications made inside the function directly alter the caller's variable without memory copying overhead.</p>\n\n<h3>Pass-by-Const-Reference (<code>const T&amp;</code>)</h3>\n\n<p>For large objects (such as <code>std::string</code> or <code>std::vector</code>), passing by const reference (<code>const std::string&amp;</code>) avoids memory copy overhead while guaranteeing the function cannot mutate the original object.</p>\n",
    "starterCode": "// 34_pass_by_reference.cpp\n#include <iostream>\n#include <string>\n\nvoid valIncrement(int x) {\n    x += 10; // Alters local copy only\n}\n\nvoid refIncrement(int& x) {\n    x += 10; // Mutates caller's original variable\n}\n\nvoid printString(const std::string& str) {\n    std::cout << \"String content: \" << str << \"\\n\";\n}\n\nint main() {\n    int num{5};\n\n    valIncrement(num);\n    std::cout << \"After valIncrement: \" << num << \"\\n\"; // Still 5\n\n    refIncrement(num);\n    std::cout << \"After refIncrement: \" << num << \"\\n\"; // Now 15\n\n    std::string text{\"Modern C++ Pass-by-Reference\"};\n    printString(text);\n\n    return 0;\n}",
    "explanation": "`valIncrement(num)` leaves `num` unchanged at `5`. `refIncrement(num)` mutates `num` directly to `15`. `printString` accepts `const std::string&`, avoiding a copy.",
    "quiz": {
      "question": "Why is `const T&` preferred for passing large objects into functions that do not modify them?",
      "options": [
        "It enables dynamic heap allocation",
        "It avoids expensive memory copies while preventing accidental mutation",
        "It converts references into pointers",
        "It executes faster in multithreaded code"
      ],
      "answer": 1,
      "explanation": "`const T&` provides zero-copy performance while protecting caller data from mutation."
    },
    "fillBlank": {
      "instructions": "Complete the function signature taking an integer by mutable reference:",
      "codeTemplate": "void resetCounter(int___1___ count) {\n    count = 0;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "&",
          "hint": "Reference declarator symbol"
        }
      ]
    }
  },
  {
    "id": "28-exception-handling",
    "category": "Foundations Extended",
    "fileSlug": "28_exception_handling",
    "title": "28. Exception Handling Mechanics (try, catch, throw)",
    "summary": "Handle runtime errors safely using try, catch, and throw blocks alongside standard exception types.",
    "cBridge": "In C, error handling relied on returning integer status codes (e.g. `-1`) or setting `errno`, which callers frequently ignored. C++ exception handling decouples error generation from error resolution.",
    "content": "\n<h3>Exception Control Flow</h3>\n\n<p>Exception handling separates error detection from error resolution:</p>\n\n<ul>\n\n  <li><strong><code>throw</code>:</strong> Signal an error by throwing an exception object.</li>\n\n  <li><strong><code>try</code> block:</strong> Encloses code that may throw an exception.</li>\n\n  <li><strong><code>catch</code> block:</strong> Intercepts and handles thrown exception objects.</li>\n\n</ul>\n\n<h3>Standard Exception Hierarchy (<code>&lt;stdexcept&gt;</code>)</h3>\n\n<p>Standard exception classes derive from <code>std::exception</code> and supply a <code>.what()</code> member method describing the error:</p>\n\n<ul>\n\n  <li><code>std::invalid_argument</code>: Thrown when invalid parameters are supplied.</li>\n\n  <li><code>std::out_of_range</code>: Thrown when element indices exceed container bounds.</li>\n\n  <li><code>std::runtime_error</code>: Reports general runtime failures.</li>\n\n</ul>\n",
    "starterCode": "// 35_exception_handling.cpp\n#include <iostream>\n#include <stdexcept>\n\ndouble divide(double a, double b) {\n    if (b == 0.0) {\n        throw std::invalid_argument{\"Division by zero is undefined.\"};\n    }\n    return a / b;\n}\n\nint main() {\n    try {\n        std::cout << \"10 / 2 = \" << divide(10.0, 2.0) << \"\\n\";\n        std::cout << \"10 / 0 = \" << divide(10.0, 0.0) << \"\\n\";\n    } catch (const std::invalid_argument& e) {\n        std::cerr << \"Caught Exception: \" << e.what() << std::endl;\n    }\n\n    return 0;\n}",
    "explanation": "`divide(10, 0)` throws `std::invalid_argument`. Control transfers to the `catch` block, where `e.what()` outputs `\"Division by zero is undefined.\"`.",
    "quiz": {
      "question": "Which member function of `std::exception` returns an explanatory C-string description of the error?",
      "options": [
        "`.message()`",
        "`.what()`",
        "`.description()`",
        "`.error()`"
      ],
      "answer": 1,
      "explanation": "The `.what()` member method returns an explanatory null-terminated string describing the exception."
    },
    "fillBlank": {
      "instructions": "Complete the `try`-`catch` block syntax catching a standard exception by const reference:",
      "codeTemplate": "#include <stdexcept>\n#include <iostream>\n\ntry {\n    throw std::runtime_error(\"System error\");\n} ___1___ (const std::runtime_error___2___ e) {\n    std::cout << e.what() << std::endl;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "catch",
          "hint": "Exception handler block keyword"
        },
        {
          "id": 2,
          "answer": "&",
          "hint": "Reference declarator symbol"
        }
      ]
    }
  },
  {
    "id": "29-input-grade-calculator",
    "category": "Foundations Extended",
    "fileSlug": "29_grade_calculator",
    "title": "29. Interactive Grade Calculator with Input Validation",
    "summary": "Synthesize input loops, exceptions, and switch statements to build a robust interactive student grade calculator.",
    "cBridge": "Combining input validation loops with C++ exceptions provides robust input handling for console tools.",
    "content": "\n<h3>Robust Interactive Input Processing</h3>\n\n<p>Real-world console applications validate input ranges before performing computations, catching malformed input gracefully.</p>\n\n<h3>Grade Classification Logic</h3>\n\n<p>Scores spanning $0.0$ to $100.0$ map to letter grades using discrete ranges:</p>\n\n<ul>\n\n  <li>$90.0 - 100.0$: Grade A</li>\n\n  <li>$80.0 - 89.9$: Grade B</li>\n\n  <li>$70.0 - 79.9$: Grade C</li>\n\n  <li>$60.0 - 69.9$: Grade D</li>\n\n  <li>Below $60.0$: Grade F</li>\n\n</ul>\n",
    "starterCode": "// 36_grade_calculator.cpp\n#include <iostream>\n#include <vector>\n#include <stdexcept>\n\nchar computeGrade(double score) {\n    if (score < 0.0 || score > 100.0) {\n        throw std::out_of_range{\"Score must be between 0.0 and 100.0.\"};\n    }\n    if (score >= 90.0) return 'A';\n    if (score >= 80.0) return 'B';\n    if (score >= 70.0) return 'C';\n    if (score >= 60.0) return 'D';\n    return 'F';\n}\n\nint main() {\n    std::cout << \"=== Student Grade Calculator ===\\n\";\n    double score{0.0};\n\n    std::cout << \"Enter student score (0-100): \";\n    std::cin >> score;\n\n    try {\n        char grade = computeGrade(score);\n        std::cout << \"Score: \" << score << \" -> Grade: \" << grade << std::endl;\n    } catch (const std::out_of_range& e) {\n        std::cerr << \"Input Error: \" << e.what() << std::endl;\n    }\n\n    return 0;\n}",
    "explanation": "`computeGrade` checks `score < 0 || score > 100`, throwing `std::out_of_range` for invalid inputs. Valid scores evaluate letter grades safely.",
    "quiz": {
      "question": "Which exception type from `<stdexcept>` is appropriate for reporting out-of-bounds input values?",
      "options": [
        "`std::domain_error`",
        "`std::out_of_range`",
        "`std::logic_error`",
        "`std::bad_alloc`"
      ],
      "answer": 1,
      "explanation": "`std::out_of_range` reports values that fall outside expected bounds."
    },
    "fillBlank": {
      "instructions": "Throw an `out_of_range` exception when the score falls outside valid range boundaries:",
      "codeTemplate": "if (score < 0 || score > 100) {\n    ___1___ std::out_of_range(\"Invalid score range\");\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "throw",
          "hint": "Exception raising keyword"
        }
      ]
    }
  },
  {
    "id": "30-virtual-functions-and-polymorphism",
    "category": "Object-Oriented Extended",
    "fileSlug": "30_virtual_functions",
    "title": "30. Virtual Functions, Pure Interfaces & Polymorphism",
    "summary": "Achieve dynamic runtime polymorphism using virtual functions, pure virtual interfaces, and vtables.",
    "cBridge": "In C, dynamic dispatch required manually managing arrays of function pointers inside structs. In C++, marking a method `virtual` directs the compiler to generate virtual method tables (vtables) automatically.",
    "content": "\n<h3>Dynamic Runtime Dispatch</h3>\n\n<p>Dynamic polymorphism enables invoking derived class method implementations through base class pointers or references at runtime.</p>\n\n<h3>Virtual Methods & Virtual Tables (vtables)</h3>\n\n<p>Marking a base method <code>virtual</code> instructs the compiler to dispatch function calls through a virtual method table (vtable) pointer (<code>vptr</code>).</p>\n\n<h3>Abstract Base Classes & Pure Virtual Functions</h3>\n\n<p>A method declared with <code>= 0</code> (<code>virtual void draw() const = 0;</code>) is a pure virtual function. A class containing at least one pure virtual function is an abstract base class (interface) and cannot be instantiated directly.</p>\n\n<h3>Virtual Destructors</h3>\n\n<p>Polymorphic base classes must declare a <code>virtual ~Base() = default;</code> destructor to ensure derived class destructors run when objects are deleted through base class pointers.</p>\n",
    "starterCode": "// 37_virtual_functions.cpp\n#include <iostream>\n#include <vector>\n\n// Abstract Base Class\nclass Shape {\npublic:\n    virtual void draw() const = 0; // Pure virtual function\n    virtual ~Shape() = default;   // Virtual destructor\n};\n\nclass Circle : public Shape {\npublic:\n    void draw() const override {\n        std::cout << \"Drawing a Circle.\\n\";\n    }\n};\n\nclass Rectangle : public Shape {\npublic:\n    void draw() const override {\n        std::cout << \"Drawing a Rectangle.\\n\";\n    }\n};\n\nint main() {\n    Circle c;\n    Rectangle r;\n\n    std::vector<Shape*> shapes{&c, &r};\n\n    for (const Shape* s : shapes) {\n        s->draw(); // Dynamic dispatch via vtable\n    }\n\n    return 0;\n}",
    "explanation": "`Shape` is an abstract base class. `Circle` and `Rectangle` implement `draw()`, using `override` to instruct the compiler to verify override signatures. In `main`, `s->draw()` dispatches derived implementations dynamically at runtime.",
    "quiz": {
      "question": "Why must polymorphic base classes declare a `virtual` destructor?",
      "options": [
        "To enable default initialiser lists",
        "To guarantee derived class destructors execute when deleting via base class pointers",
        "To prevent inheritance",
        "To speed up virtual table lookups"
      ],
      "answer": 1,
      "explanation": "Deleting a derived object via a base pointer without a `virtual` base destructor results in undefined behaviour and memory leaks."
    },
    "fillBlank": {
      "instructions": "Declare a pure virtual function signature and virtual destructor:",
      "codeTemplate": "class Interface {\npublic:\n    ___1___ void execute() const = 0;\n    virtual ~Interface() = ___2___;\n};",
      "blanks": [
        {
          "id": 1,
          "answer": "virtual",
          "hint": "Keyword enabling dynamic virtual method dispatch"
        },
        {
          "id": 2,
          "answer": "default",
          "hint": "Keyword generating standard default destructor implementation"
        }
      ]
    }
  },
  {
    "id": "31-interactive-oop-program",
    "category": "Object-Oriented Extended",
    "fileSlug": "31_bank_account",
    "title": "31. Interactive Bank Account System (OOP + Input)",
    "summary": "Apply OOP principles, encapsulation, and exceptions to build an interactive banking application.",
    "cBridge": "This exercise encapsulates bank balance state behind public deposit/withdrawal interfaces, guarding against negative balances using exceptions.",
    "content": "\n<h3>Enforcing Domain Invariants</h3>\n\n<p>A bank account class must enforce strict invariants:</p>\n\n<ul>\n\n  <li>Account balances cannot be negative.</li>\n\n  <li>Withdrawals exceeding available balances must be rejected.</li>\n\n  <li>Deposits must be positive numbers.</li>\n\n</ul>\n",
    "starterCode": "// 38_bank_account.cpp\n#include <iostream>\n#include <string>\n#include <stdexcept>\n\nclass BankAccount {\nprivate:\n    std::string ownerName;\n    double balance{0.0};\n\npublic:\n    BankAccount(std::string name, double initialBalance)\n        : ownerName{name} {\n        if (initialBalance < 0.0) {\n            throw std::invalid_argument{\"Initial balance cannot be negative.\"};\n        }\n        balance = initialBalance;\n    }\n\n    void deposit(double amount) {\n        if (amount <= 0.0) {\n            throw std::invalid_argument{\"Deposit amount must be positive.\"};\n        }\n        balance += amount;\n    }\n\n    void withdraw(double amount) {\n        if (amount > balance) {\n            throw std::runtime_error{\"Insufficient funds for withdrawal.\"};\n        }\n        balance -= amount;\n    }\n\n    double getBalance() const { return balance; }\n    std::string getOwner() const { return ownerName; }\n};\n\nint main() {\n    try {\n        BankAccount acc{\"Ada Lovelace\", 500.0};\n        acc.deposit(150.0);\n        std::cout << \"Owner: \" << acc.getOwner() << \", Balance: $\" << acc.getBalance() << \"\\n\";\n\n        acc.withdraw(200.0);\n        std::cout << \"After withdrawal balance: $\" << acc.getBalance() << \"\\n\";\n\n        acc.withdraw(1000.0); // Throws exception\n    } catch (const std::exception& e) {\n        std::cerr << \"Transaction Failed: \" << e.what() << std::endl;\n    }\n\n    return 0;\n}",
    "explanation": "`deposit` and `withdraw` enforce domain rules. Attempting to withdraw `$1000.0` from a `$450.0` balance throws `std::runtime_error`, which is caught safely in `main`.",
    "quiz": {
      "question": "What design principle prevents external code from setting `balance = -9999.0` directly?",
      "options": [
        "Function overloading",
        "Private field encapsulation with validated mutator interfaces",
        "Multiple inheritance",
        "Multiple virtual tables"
      ],
      "answer": 1,
      "explanation": "Marking `balance` `private` ensures mutations pass through validated methods."
    },
    "fillBlank": {
      "instructions": "Throw a `runtime_error` when a withdrawal request exceeds the account balance:",
      "codeTemplate": "if (amount > balance) {\n    ___1___ std::runtime_error(\"Insufficient balance\");\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "throw",
          "hint": "Exception raising keyword"
        }
      ]
    }
  },
  {
    "id": "32-references-and-pointers-compared",
    "category": "Memory Architecture Extended",
    "fileSlug": "32_references_vs_pointers",
    "title": "32. Pointers vs References Side-by-Side Comparison",
    "summary": "Contrast pointer syntax (reseating, nullability, dereferencing) against reference semantics (non-null, immutable aliases).",
    "cBridge": "Pointers originate in C. References were added in C++ to supply cleaner zero-copy parameter passing syntax without dereferencing operators.",
    "content": "\n<h3>Pointer Mechanics</h3>\n\n<p>Pointers are variables that store memory addresses. Pointers can be assigned <code>nullptr</code>, reseated to point to different variables during execution, and require explicit dereferencing (<code>*ptr</code>).</p>\n\n<h3>Reference Mechanics</h3>\n\n<p>References are non-null immutable aliases bound permanently to an object upon initialisation. References cannot be <code>nullptr</code> and cannot be reseated.</p>\n\n<h3>Direct Comparison Matrix</h3>\n\n<p>| Feature | Pointer (<code>T*</code>) | Reference (<code>T&amp;</code>) |</p>\n\n<p>| --- | --- | --- |</p>\n\n<p>| Nullability | Can be <code>nullptr</code> | Cannot be null |</p>\n\n<p>| Reseating | Can point to different objects | Cannot be reseated after binding |</p>\n\n<p>| Syntax | Requires <code>&amp;</code> to obtain address, <code>*</code> to dereference | Uses standard variable access syntax |</p>\n\n<p>| Indirection | Can have multi-level indirection (<code>T**</code>) | Single alias level only |</p>\n",
    "starterCode": "// 39_references_vs_pointers.cpp\n#include <iostream>\n\nvoid modifyViaPointer(int* ptr) {\n    if (ptr != nullptr) {\n        *ptr = 100;\n    }\n}\n\nvoid modifyViaReference(int& ref) {\n    ref = 200;\n}\n\nint main() {\n    int val{10};\n\n    int* ptr = &val;\n    int& ref = val;\n\n    std::cout << \"Initial val: \" << val << \"\\n\";\n\n    modifyViaPointer(&val);\n    std::cout << \"After modifyViaPointer: \" << val << \"\\n\";\n\n    modifyViaReference(val);\n    std::cout << \"After modifyViaReference: \" << val << std::endl;\n\n    return 0;\n}",
    "explanation": "`modifyViaPointer` checks `ptr != nullptr` before dereferencing `*ptr`. `modifyViaReference` mutates `ref` directly without pointer syntax.",
    "quiz": {
      "question": "Which statement regarding C++ references is accurate?",
      "options": [
        "References can be assigned `nullptr`",
        "References must be bound upon initialisation and cannot be reseated",
        "References require pointer dereferencing syntax",
        "References allocate 8 bytes of storage on the heap"
      ],
      "answer": 1,
      "explanation": "References act as permanent aliases bound upon initialisation and cannot be reseated."
    },
    "fillBlank": {
      "instructions": "Complete the reference binding syntax and pointer address-of assignment:",
      "codeTemplate": "int target = 42;\nint___1___ ref = target;\nint___2___ ptr = &target;",
      "blanks": [
        {
          "id": 1,
          "answer": "&",
          "hint": "Reference declarator symbol"
        },
        {
          "id": 2,
          "answer": "",
          "hint": ""
        }
      ]
    }
  },
  {
    "id": "33-input-driven-word-counter",
    "category": "Foundations Extended",
    "fileSlug": "33_word_counter",
    "title": "33. Interactive Word & Character Counter Utility",
    "summary": "Parse console stream input to compute total line counts, word counts, and character counts.",
    "cBridge": "In C, parsing word boundaries required manual `getchar()` loops and checking `isspace()`. In C++, `std::stringstream` processes word tokens automatically.",
    "content": "\n<h3>Stream Parsing Mechanics</h3>\n\n<p>Reading entire sentences using <code>std::getline</code> and feeding them into <code>std::stringstream</code> decomposes formatted text into individual word tokens via <code>&gt;&gt;</code>.</p>\n",
    "starterCode": "// 40_word_counter.cpp\n#include <iostream>\n#include <string>\n#include <sstream>\n\nint main() {\n    std::cout << \"Enter a paragraph of text:\\n\";\n    std::string line{};\n    std::getline(std::cin, line);\n\n    std::stringstream ss{line};\n    std::string word{};\n    int wordCount{0};\n\n    while (ss >> word) {\n        ++wordCount;\n    }\n\n    std::cout << \"Character count (total): \" << line.length() << \"\\n\";\n    std::cout << \"Word count: \" << wordCount << std::endl;\n\n    return 0;\n}",
    "explanation": "`std::getline` reads a line of text. `std::stringstream ss{line}` extracts whitespace-delimited word tokens in the `while (ss >> word)` loop, incrementing `wordCount`.",
    "quiz": {
      "question": "Which stream class from `<sstream>` extracts whitespace-delimited word tokens from a string?",
      "options": [
        "`std::ifstream`",
        "`std::stringstream`",
        "`std::ofstream`",
        "`std::stdout`"
      ],
      "answer": 1,
      "explanation": "`std::stringstream` enables treating an `std::string` as an input/output stream."
    },
    "fillBlank": {
      "instructions": "Complete the `stringstream` header inclusion and stream extraction loop:",
      "codeTemplate": "#include <___1___>\n#include <string>\n\nstd::string text = \"Modern C++ Systems\";\nstd::stringstream ss(text);\nstd::string word;\nwhile (ss ___2___ word) {\n    // Process token\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "sstream",
          "hint": "Standard C++ stringstream header"
        },
        {
          "id": 2,
          "answer": ">>",
          "hint": "Stream extraction operator"
        }
      ]
    }
  },
  {
    "id": "34-function-overloading",
    "category": "Foundations Extended",
    "fileSlug": "34_function_overloading",
    "title": "34. Function Overloading & Name Mangling",
    "summary": "Declare multiple functions sharing identical names with distinct parameter signatures and understand compiler name mangling.",
    "cBridge": "C does not support function overloading; functions must have unique names (e.g. `abs()`, `fabs()`, `labs()`). C++ compiler name mangling encodes parameter signatures into exported symbol names, enabling function overloading.",
    "content": "\n<h3>Overloading Signatures</h3>\n\n<p>Function overloading allows defining multiple functions sharing the same name provided their parameter lists differ in parameter count, parameter types, or parameter order. Return types alone are insufficient to distinguish overloaded functions.</p>\n\n<h3>Compiler Name Mangling</h3>\n\n<p>Because linkers require unique symbol names, C++ compilers mangle function names by encoding signature type information into generated object file symbols (such as <code>_Z3addii</code> vs <code>_Z3adddd</code>). To disable name mangling when linking against C libraries, use <code>extern \"C\"</code>.</p>\n",
    "starterCode": "// 41_function_overloading.cpp\n#include <iostream>\n\nint add(int a, int b) {\n    std::cout << \"[int overload] \";\n    return a + b;\n}\n\ndouble add(double a, double b) {\n    std::cout << \"[double overload] \";\n    return a + b;\n}\n\nint main() {\n    std::cout << add(5, 10) << \"\\n\";      // Calls int overload\n    std::cout << add(3.5, 2.5) << std::endl; // Calls double overload\n    return 0;\n}",
    "explanation": "`add(5, 10)` passes integer literals, resolving to `add(int, int)`. `add(3.5, 2.5)` passes double literals, resolving to `add(double, double)`.",
    "quiz": {
      "question": "Why are function return types alone insufficient to establish valid function overloads?",
      "options": [
        "Return types are ignored by compilers",
        "Call expressions do not require capturing return values, making signature resolution ambiguous",
        "Return types cannot be mangled",
        "C++ limits functions to single return types"
      ],
      "answer": 1,
      "explanation": "Call expressions like `add(5, 10);` discard return values, making signature matching by return type impossible."
    },
    "fillBlank": {
      "instructions": "Complete the `extern` block disabling C++ name mangling for C library headers:",
      "codeTemplate": "___1___ \"C\" {\n    #include <stdio.h>\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "extern",
          "hint": "Keyword controlling language linkage specification"
        }
      ]
    }
  },
  {
    "id": "35-file-io-read-write",
    "category": "Foundations Extended",
    "fileSlug": "35_file_io",
    "title": "35. File I/O: Reading & Writing Files",
    "summary": "Read and write external text and binary files using std::ifstream and std::ofstream file streams.",
    "cBridge": "In C, file I/O relied on `FILE*`, `fopen()`, `fprintf()`, and `fclose()`. In C++, `<fstream>` stream classes (`std::ifstream`, `std::ofstream`) open files upon initialisation and close file handles automatically upon destruction via RAII.",
    "content": "\n<h3>File Streams (<code>&lt;fstream&gt;</code>)</h3>\n\n<ul>\n\n  <li><code>std::ofstream</code>: Output file stream used to create and write data to files.</li>\n\n  <li><code>std::ifstream</code>: Input file stream used to read data from files.</li>\n\n  <li><code>std::fstream</code>: Bidirectional input/output file stream.</li>\n\n</ul>\n\n<h3>File Opening Modes</h3>\n\n<p>Streams accept open mode flags:</p>\n\n<ul>\n\n  <li><code>std::ios::app</code>: Append output to the end of the file.</li>\n\n  <li><code>std::ios::binary</code>: Process data in binary mode rather than converting line endings.</li>\n\n</ul>\n",
    "starterCode": "// 42_file_io.cpp\n#include <iostream>\n#include <fstream>\n#include <string>\n\nint main() {\n    std::string filename{\"example.txt\"};\n\n    // Write to file\n    {\n        std::ofstream outFile{filename};\n        if (outFile.is_open()) {\n            outFile << \"Line 1: Modern C++ File I/O\\n\";\n            outFile << \"Line 2: RAII manages file handles.\\n\";\n        }\n    } // outFile destructs and closes file automatically\n\n    // Read from file\n    std::ifstream inFile{filename};\n    if (inFile.is_open()) {\n        std::string line{};\n        while (std::getline(inFile, line)) {\n            std::cout << \"Read: \" << line << \"\\n\";\n        }\n    }\n\n    return 0;\n}",
    "explanation": "`std::ofstream outFile{filename}` creates `\"example.txt\"`. When `outFile` goes out of scope, its destructor closes the file handle. `std::ifstream` opens the file and reads lines using `std::getline`.",
    "quiz": {
      "question": "How do standard C++ file streams handle closing file handles when leaving scope?",
      "options": [
        "You must explicitly call `fclose()`",
        "Stream destructors automatically close file handles via RAII",
        "The operating system closes them after 60 seconds",
        "File handles remain open permanently"
      ],
      "answer": 1,
      "explanation": "File stream destructors manage resource cleanup automatically upon scope exit."
    },
    "fillBlank": {
      "instructions": "Complete the file stream class names for writing and reading text files:",
      "codeTemplate": "#include <fstream>\n\nstd::___1___ outFile(\"data.txt\"); // Output file stream\nstd::___2___ inFile(\"data.txt\");  // Input file stream",
      "blanks": [
        {
          "id": 1,
          "answer": "ofstream",
          "hint": "Output file stream class"
        },
        {
          "id": 2,
          "answer": "ifstream",
          "hint": "Input file stream class"
        }
      ]
    }
  },
  {
    "id": "36-storage-duration-lifecycles",
    "category": "Systems Architecture",
    "fileSlug": "36_storage_duration_lifecycles",
    "title": "36. Scope, Storage Duration & Object Lifecycles",
    "summary": "Master automatic, static, thread-local, and dynamic storage durations and object lifetimes.",
    "cBridge": "C++ formalises object life cycles. Object construction occurs when storage is initialised, and lifetime concludes before storage deallocation.",
    "content": "\n<h3>Object Storage Durations</h3>\n\n<p>C++ defines four object storage durations:</p>\n\n<ol>\n\n  <li><strong>Automatic:</strong> Local stack objects created at declaration and destroyed when exiting block scope <code>{}</code>.</li>\n\n  <li><strong>Static:</strong> Global or <code>static</code> variables allocated at program startup and destroyed at process termination.</li>\n\n  <li><strong>Thread-Local:</strong> Variables marked <code>thread_local</code> allocated per thread execution.</li>\n\n  <li><strong>Dynamic:</strong> Heap memory allocated explicitly (<code>new</code> / <code>delete</code> or smart pointers).</li>\n\n</ol>\n\n<h3>Lifetime Guarantees</h3>\n\n<p>Destructors for automatic stack objects execute in reverse order of declaration when exiting scope.</p>\n",
    "starterCode": "// 43_storage_duration_lifecycles.cpp\n#include <iostream>\n\nstruct Tracker {\n    std::string name;\n    Tracker(std::string n) : name{n} {\n        std::cout << \"Constructed: \" << name << \"\\n\";\n    }\n    ~Tracker() {\n        std::cout << \"Destructed: \" << name << \"\\n\";\n    }\n};\n\nTracker globalTracker{\"Global\"};\n\nvoid demonstrateAutomaticScope() {\n    std::cout << \"--- Entering Function ---\\n\";\n    Tracker local1{\"Local 1\"};\n    Tracker local2{\"Local 2\"};\n    std::cout << \"--- Exiting Function ---\\n\";\n} // local2 destructs, then local1 destructs\n\nint main() {\n    std::cout << \"--- Main Start ---\\n\";\n    demonstrateAutomaticScope();\n    std::cout << \"--- Main End ---\\n\";\n    return 0;\n}",
    "explanation": "`globalTracker` constructs before `main`. Inside `demonstrateAutomaticScope`, `local1` and `local2` construct. Upon exiting the function, `local2` destructs first, followed by `local1` (reverse order of declaration).",
    "quiz": {
      "question": "In what order are automatic stack objects destroyed when exiting a block scope?",
      "options": [
        "In order of declaration",
        "In reverse order of declaration",
        "In alphabetical order",
        "Randomly"
      ],
      "answer": 1,
      "explanation": "Stack allocation unwinds in LIFO (Last In, First Out) order, destroying local objects in reverse declaration order."
    },
    "fillBlank": {
      "instructions": "Complete the storage duration keyword allocating thread-specific variables:",
      "codeTemplate": "___1___ int threadCounter{0};",
      "blanks": [
        {
          "id": 1,
          "answer": "thread_local",
          "hint": "Specifier for thread-local storage duration"
        }
      ]
    }
  },
  {
    "id": "37-dynamic-memory-allocation",
    "category": "Systems Architecture",
    "fileSlug": "37_dynamic_memory_allocation",
    "title": "37. Dynamic Memory Allocation (new / delete) & Stack vs Heap",
    "summary": "Allocating dynamic memory using new and delete, preventing memory leaks, and understanding stack vs heap tradeoffs.",
    "cBridge": "In C, heap memory was allocated using `malloc()` and `free()`, which do not invoke constructors or destructors. C++ provides `new` and `delete`, which allocate heap memory AND run constructors/destructors.",
    "content": "\n<h3>Stack vs Heap Architecture</h3>\n\n<ul>\n\n  <li><strong>Stack:</strong> Fast, structured LIFO memory managed automatically by CPU stack pointers. Limited in size.</li>\n\n  <li><strong>Heap (Free Store):</strong> Large pool of memory allocated dynamically at runtime using <code>new</code>. Must be deallocated with <code>delete</code> to prevent memory leaks.</li>\n\n</ul>\n\n<h3>Array Allocation Syntax</h3>\n\n<p>Allocating dynamic arrays uses <code>new[]</code> and requires deallocating with <code>delete[]</code>. Mismatched deallocation (<code>delete</code> on <code>new[]</code>) causes undefined behaviour.</p>\n",
    "starterCode": "// 44_dynamic_memory_allocation.cpp\n#include <iostream>\n\nstruct Resource {\n    Resource() { std::cout << \"Resource acquired.\\n\"; }\n    ~Resource() { std::cout << \"Resource released.\\n\"; }\n};\n\nint main() {\n    std::cout << \"=== Single Heap Allocation ===\\n\";\n    Resource* rPtr = new Resource();\n    delete rPtr; // Calls destructor and frees heap memory\n\n    std::cout << \"\\n=== Array Heap Allocation ===\\n\";\n    int* arr = new int[5]{10, 20, 30, 40, 50};\n    std::cout << \"arr[2] = \" << arr[2] << \"\\n\";\n    delete[] arr; // Correct array delete operator\n\n    return 0;\n}",
    "explanation": "`new Resource()` allocates heap memory and invokes the constructor. `delete rPtr` calls the destructor and returns memory to the free store. `delete[] arr` deallocates dynamic arrays.",
    "quiz": {
      "question": "Which operator must be used to deallocate memory created via `new int[100]`?",
      "options": [
        "`free()`",
        "`delete`",
        "`delete[]`",
        "`std::drop()`"
      ],
      "answer": 2,
      "explanation": "Dynamic arrays allocated with `new[]` must be freed using `delete[]` to execute destructors for all elements."
    },
    "fillBlank": {
      "instructions": "Complete the heap allocation and deallocation statements:",
      "codeTemplate": "int* valPtr = ___1___ int{42};\ndelete valPtr;\n\nint* arrPtr = new int[10];\n___2___[] arrPtr;",
      "blanks": [
        {
          "id": 1,
          "answer": "new",
          "hint": "Heap memory allocation operator"
        },
        {
          "id": 2,
          "answer": "delete",
          "hint": "Heap memory deallocation operator"
        }
      ]
    }
  },
  {
    "id": "38-stl-sequence-containers",
    "category": "Modern STL Systems",
    "fileSlug": "38_stl_sequence_containers",
    "title": "38. Standard Template Library Sequence Containers (std::array & std::vector)",
    "summary": "Master modern sequence containers std::array and std::vector for fixed and dynamic contiguous storage.",
    "cBridge": "`std::array<T, N>` replaces raw C arrays, preserving fixed stack performance while supplying iterator interfaces and `.size()`. `std::vector<T>` supplies heap-backed dynamic resizing arrays.",
    "content": "\n<h3><code>std::array&lt;T, N&gt;</code> (Fixed-Size Stack Container)</h3>\n\n<p><code>std::array</code> wraps raw fixed-size arrays without performance overhead while providing STL iterator support, size queries (<code>.size()</code>), and bounds-checked element access (<code>.at()</code>).</p>\n\n<h3><code>std::vector&lt;T&gt;</code> (Dynamic Heap Container)</h3>\n\n<p><code>std::vector</code> manages contiguous heap memory, resizing dynamically when capacity is exceeded. <code>.reserve(n)</code> preallocates memory capacity to prevent repeated reallocations during bulk insertions.</p>\n",
    "starterCode": "// 45_stl_sequence_containers.cpp\n#include <iostream>\n#include <array>\n#include <vector>\n\nint main() {\n    // Fixed-size stack array\n    std::array<int, 3> fixedArr{1, 2, 3};\n    std::cout << \"std::array size: \" << fixedArr.size() << \"\\n\";\n\n    // Dynamic heap vector\n    std::vector<int> vec;\n    vec.reserve(10); // Pre-allocate capacity\n    vec.push_back(100);\n    vec.push_back(200);\n\n    std::cout << \"Vector size: \" << vec.size() << \", Capacity: \" << vec.capacity() << \"\\n\";\n\n    for (int val : vec) {\n        std::cout << val << \" \";\n    }\n    std::cout << std::endl;\n\n    return 0;\n}",
    "explanation": "`std::array<int, 3>` allocates fixed stack memory. `vec.reserve(10)` preallocates heap memory capacity for 10 elements, optimizing subsequent `push_back()` calls.",
    "quiz": {
      "question": "What is the primary operational difference between `std::array<int, 5>` and `std::vector<int>`?",
      "options": [
        "`std::array` stores data on the heap",
        "`std::array` has a fixed compile-time size, whereas `std::vector` resizes dynamically at runtime",
        "`std::vector` does not support iterators",
        "`std::array` is slower than raw C arrays"
      ],
      "answer": 1,
      "explanation": "`std::array` enforces fixed compile-time sizes on the stack, while `std::vector` resizes dynamically on the heap."
    },
    "fillBlank": {
      "instructions": "Complete the container declarations for a fixed 4-element stack array and a dynamic vector:",
      "codeTemplate": "#include <array>\n#include <vector>\n\nstd::___1___<double, 4> fixedGrid{1.0, 2.0, 3.0, 4.0};\nstd::___2___<double> dynamicGrid;",
      "blanks": [
        {
          "id": 1,
          "answer": "array",
          "hint": "Fixed-size STL stack container template"
        },
        {
          "id": 2,
          "answer": "vector",
          "hint": "Dynamic STL heap container template"
        }
      ]
    }
  },
  {
    "id": "39-stl-associative-containers",
    "category": "Modern STL Systems",
    "fileSlug": "39_stl_associative_containers",
    "title": "39. Standard Template Library Associative Containers (std::map & std::unordered_map)",
    "summary": "Store key-value pairs using balanced trees (std::map) and hash tables (std::unordered_map).",
    "cBridge": "C lacks standard associative containers. C++ provides `std::map` (ordered red-black trees) and `std::unordered_map` (hash tables).",
    "content": "\n<h3><code>std::map</code> vs <code>std::unordered_map</code></h3>\n\n<ul>\n\n  <li><strong><code>std::map&lt;Key, Value&gt;</code>:</strong> Implemented as a balanced binary search tree. Keys are maintained in sorted order. Search, insertion, and deletion operate in logarithmic time $O(\\log N)$.</li>\n\n  <li><strong><code>std::unordered_map&lt;Key, Value&gt;</code>:</strong> Implemented as a hash table. Keys are unsorted. Search, insertion, and deletion operate in average constant time $O(1)$.</li>\n\n</ul>\n\n<h3>Key Element Access</h3>\n\n<p>Subscript syntax <code>map[key]</code> searches for <code>key</code>. If <code>key</code> is absent, it inserts a default-constructed entry. <code>.at(key)</code> performs bounds checking and throws <code>std::out_of_range</code> if the key does not exist.</p>\n",
    "starterCode": "// 46_stl_associative_containers.cpp\n#include <iostream>\n#include <string>\n#include <map>\n#include <unordered_map>\n\nint main() {\n    // Ordered map (Sorted by key)\n    std::map<std::string, int> phoneBook;\n    phoneBook[\"Charlie\"] = 300;\n    phoneBook[\"Alice\"] = 100;\n    phoneBook[\"Bob\"] = 200;\n\n    std::cout << \"=== Ordered std::map (Sorted Keys) ===\\n\";\n    for (const auto& [name, number] : phoneBook) {\n        std::cout << name << \": \" << number << \"\\n\";\n    }\n\n    // Unordered map (Hash Table, O(1) average lookup)\n    std::unordered_map<std::string, double> prices;\n    prices[\"Apple\"] = 0.99;\n    prices[\"Banana\"] = 0.59;\n\n    std::cout << \"\\nApple price: $\" << prices.at(\"Apple\") << std::endl;\n\n    return 0;\n}",
    "explanation": "`phoneBook` iterates keys in sorted order (`\"Alice\"`, `\"Bob\"`, `\"Charlie\"`). `prices.at(\"Apple\")` looks up `\"Apple\"` in $O(1)$ average time.",
    "quiz": {
      "question": "What is the average time complexity for searching a key in `std::unordered_map`?",
      "options": [
        "$O(N)$",
        "$O(\\log N)$",
        "$O(1)$",
        "$O(N \\log N)$"
      ],
      "answer": 2,
      "explanation": "`std::unordered_map` uses hash table indexing, achieving average $O(1)$ constant time lookup performance."
    },
    "fillBlank": {
      "instructions": "Complete the container instantiation for an ordered key-value map mapping strings to integers:",
      "codeTemplate": "#include <map>\n#include <string>\n\nstd::___1___<std::string, int> studentGrades;\nstudentGrades[\"Ada\"] = 98;",
      "blanks": [
        {
          "id": 1,
          "answer": "map",
          "hint": "Balanced tree associative container template"
        }
      ]
    }
  },
  {
    "id": "40-lambda-expressions",
    "category": "Modern STL Systems",
    "fileSlug": "40_lambda_expressions",
    "title": "40. Lambda Expressions, Closures & Captures",
    "summary": "Create anonymous inline functions using C++ lambda expressions, capture clauses, and closures.",
    "cBridge": "In C, passing callbacks required static function pointers. C++ lambdas generate inline anonymous closure objects that can capture local variables from surrounding scopes.",
    "content": "\n<h3>Lambda Syntax Anatomy</h3>\n\n<p><code>[captures](parameters) -&gt; return_type { body }</code></p>\n\n<ul>\n\n  <li><strong>Capture Clause <code>[]</code>:</strong> Specifies variables captured from surrounding scope.</li>\n\n  <li><code>[]</code>: Captures nothing.</li>\n\n  <li><code>[=]</code>: Captures all surrounding variables by value (read-only copy).</li>\n\n  <li><code>[&amp;]</code>: Captures all surrounding variables by reference (mutable alias).</li>\n\n  <li><code>[x, &amp;y]</code>: Explicit capture (<code>x</code> by value, <code>y</code> by reference).</li>\n\n  <li><strong>Parameters <code>()</code>:</strong> Function parameters.</li>\n\n  <li><strong>Body <code>{}</code>:</strong> Executable statement block.</li>\n\n</ul>\n",
    "starterCode": "// 47_lambda_expressions.cpp\n#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    int factor{3};\n\n    std::vector<int> nums{1, 2, 3, 4, 5};\n\n    // Lambda capturing 'factor' by value\n    auto multiply = [factor](int val) {\n        return val * factor;\n    };\n\n    std::cout << \"5 * \" << factor << \" = \" << multiply(5) << \"\\n\";\n\n    // Lambda capturing total by reference for accumulation\n    int total{0};\n    std::for_each(nums.begin(), nums.end(), [&total](int val) {\n        total += val;\n    });\n\n    std::cout << \"Total sum via lambda: \" << total << std::endl;\n\n    return 0;\n}",
    "explanation": "`[factor](int val)` captures `factor` ($3$) by value. `[&total](int val)` captures `total` by reference, mutating `total` in-place inside `std::for_each`.",
    "quiz": {
      "question": "Which capture specifier captures all surrounding scope variables by reference?",
      "options": [
        "`[=]`",
        "`[&]`",
        "`[this]`",
        "`[*]`"
      ],
      "answer": 1,
      "explanation": "`[&]` captures all surrounding scope variables by reference."
    },
    "fillBlank": {
      "instructions": "Complete the capture clause capturing variable `multiplier` by value:",
      "codeTemplate": "int multiplier = 10;\nauto scale = [___1___](int num) {\n    return num * multiplier;\n};",
      "blanks": [
        {
          "id": 1,
          "answer": "multiplier",
          "hint": "Variable name placed in capture brackets for value capture"
        }
      ]
    }
  },
  {
    "id": "41-stl-algorithms-iterators",
    "category": "Modern STL Systems",
    "fileSlug": "41_stl_algorithms_iterators",
    "title": "41. Standard Algorithms & Iterator Mechanics",
    "summary": "Leverage standard STL algorithms (std::sort, std::find_if, std::transform) using iterator ranges.",
    "cBridge": "In C, sorting required `qsort()` with `void*` function pointers. C++ `<algorithm>` routines accept type-safe iterator ranges (`container.begin()`, `container.end()`), enabling inline optimisations.",
    "content": "\n<h3>Iterator Ranges (<code>[begin, end)</code>)</h3>\n\n<p>STL algorithms operate on half-open iterator ranges <code>[begin, end)</code>, where <code>begin</code> points to the first element and <code>end</code> points one past the final element.</p>\n\n<h3>Essential STL Algorithms</h3>\n\n<ul>\n\n  <li><code>std::sort(begin, end)</code>: Sorts elements in $O(N \\log N)$ time.</li>\n\n  <li><code>std::find_if(begin, end, predicate)</code>: Returns an iterator to the first element matching a predicate condition.</li>\n\n  <li><code>std::transform(begin, end, dest, op)</code>: Applies a transformation function to each element, storing output at <code>dest</code>.</li>\n\n</ul>\n",
    "starterCode": "// 48_stl_algorithms_iterators.cpp\n#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> nums{5, 2, 8, 1, 9, 4};\n\n    // Sort vector in ascending order\n    std::sort(nums.begin(), nums.end());\n\n    std::cout << \"Sorted numbers: \";\n    for (int n : nums) std::cout << n << \" \";\n    std::cout << \"\\n\";\n\n    // Find first even number using find_if and lambda\n    auto it = std::find_if(nums.begin(), nums.end(), [](int n) {\n        return n % 2 == 0;\n    });\n\n    if (it != nums.end()) {\n        std::cout << \"First even number found: \" << *it << std::endl;\n    }\n\n    return 0;\n}",
    "explanation": "`std::sort` orders elements ascending. `std::find_if` evaluates the lambda predicate `n % 2 == 0`, returning an iterator to `2`. Dereferencing `*it` yields `2`.",
    "quiz": {
      "question": "What is pointed to by `container.end()` in an STL half-open range `[begin, end)`?",
      "options": [
        "The last valid element in the container",
        "One past the final valid element in the container",
        "The first element in the container",
        "`nullptr`"
      ],
      "answer": 1,
      "explanation": "`end()` points one past the final valid element, defining the half-open range termination boundary."
    },
    "fillBlank": {
      "instructions": "Complete the iterator arguments sorting a vector in ascending order:",
      "codeTemplate": "#include <vector>\n#include <algorithm>\n\nstd::vector<int> vec{4, 1, 3, 2};\nstd::sort(vec.___1___(), vec.___2___());",
      "blanks": [
        {
          "id": 1,
          "answer": "begin",
          "hint": "Member function returning iterator to first element"
        },
        {
          "id": 2,
          "answer": "end",
          "hint": "Member function returning iterator to one-past-last element"
        }
      ]
    }
  },
  {
    "id": "42-smart-pointers-raii",
    "category": "Modern Memory & Safety",
    "fileSlug": "42_smart_pointers_raii",
    "title": "42. Smart Pointers (std::unique_ptr & std::shared_ptr) & RAII",
    "summary": "Automate memory management using smart pointers std::unique_ptr and std::shared_ptr to eliminate raw memory leaks.",
    "cBridge": "Raw `new`/`delete` and `malloc()`/`free()` are error-prone, causing memory leaks and double-free bugs. Modern C++ uses smart pointers (`std::unique_ptr`, `std::shared_ptr`), which manage heap lifetimes automatically using RAII.",
    "content": "\n<h3>Resource Acquisition Is Initialisation (RAII)</h3>\n\n<p>RAII ties resource ownership (heap memory, file handles, sockets) to object lifetimes. Resource acquisition occurs in the constructor, and resource release occurs automatically in the destructor upon exiting scope.</p>\n\n<h3>Modern Smart Pointer Types</h3>\n\n<ul>\n\n  <li><strong><code>std::unique_ptr&lt;T&gt;</code>:</strong> Exclusive ownership smart pointer. Cannot be copied; ownership is transferred using <code>std::move()</code>. Created via <code>std::make_unique&lt;T&gt;()</code>.</li>\n\n  <li><strong><code>std::shared_ptr&lt;T&gt;</code>:</strong> Reference-counted shared ownership smart pointer. Deallocates heap memory when the final reference counter drops to zero. Created via <code>std::make_shared&lt;T&gt;()</code>.</li>\n\n</ul>\n",
    "starterCode": "// 49_smart_pointers_raii.cpp\n#include <iostream>\n#include <memory>\n\nstruct Widget {\n    Widget() { std::cout << \"Widget acquired.\\n\"; }\n    ~Widget() { std::cout << \"Widget automatically destroyed via RAII.\\n\"; }\n    void doWork() const { std::cout << \"Widget performing work.\\n\"; }\n};\n\nint main() {\n    std::cout << \"=== std::unique_ptr (Exclusive Ownership) ===\\n\";\n    {\n        std::unique_ptr<Widget> w1 = std::make_unique<Widget>();\n        w1->doWork();\n    } // w1 leaves scope: Widget destroyed automatically\n\n    std::cout << \"\\n=== std::shared_ptr (Shared Ownership) ===\\n\";\n    std::shared_ptr<Widget> s1 = std::make_shared<Widget>();\n    {\n        std::shared_ptr<Widget> s2 = s1; // Increment reference count\n        std::cout << \"Reference count: \" << s1.use_count() << \"\\n\";\n    } // s2 leaves scope: Reference count decrements to 1\n    std::cout << \"Reference count: \" << s1.use_count() << \"\\n\";\n\n    return 0;\n} // s1 leaves scope: Reference count drops to 0, Widget destroyed",
    "explanation": "`std::make_unique<Widget>()` allocates a `Widget` on the heap. Exiting the block scope invokes `~Widget()` automatically. `s2 = s1` increments `shared_ptr` reference count to `2`.",
    "quiz": {
      "question": "Why can `std::unique_ptr` not be copied using assignment or copy construction?",
      "options": [
        "`unique_ptr` is incompatible with `std::string`",
        "It enforces exclusive single-owner semantics to prevent double-free defects",
        "Heap memory cannot be copied in C++",
        "`unique_ptr` only works inside `main`"
      ],
      "answer": 1,
      "explanation": "`unique_ptr` disables copy constructors to enforce strict single-owner resource semantics."
    },
    "fillBlank": {
      "instructions": "Complete the helper functions instantiating unique and shared smart pointers:",
      "codeTemplate": "#include <memory>\n\nauto uPtr = std::___1___<int>(42);\nauto sPtr = std::___2___<int>(100);",
      "blanks": [
        {
          "id": 1,
          "answer": "make_unique",
          "hint": "Helper function instantiating an std::unique_ptr"
        },
        {
          "id": 2,
          "answer": "make_shared",
          "hint": "Helper function instantiating an std::shared_ptr"
        }
      ]
    }
  },
  {
    "id": "43-templates-generic-programming",
    "category": "Generic Programming",
    "fileSlug": "43_templates_generic_programming",
    "title": "43. Function & Class Templates (Generic Programming)",
    "summary": "Write type-independent generic code using function and class templates.",
    "cBridge": "In C, generic functions required macros (`#define MAX(a,b) ...`) or `void*` pointers without type safety. C++ templates generate strongly-typed code at compile time.",
    "content": "\n<h3>Compile-Time Code Generation</h3>\n\n<p>Templates allow writing generic code parameterized by types. During compilation, the compiler instantiates template functions and classes for each concrete type used, incurring zero runtime performance overhead.</p>\n\n<h3>Function Templates</h3>\n\n<p><code>template &lt;typename T&gt; T add(T a, T b) { return a + b; }</code></p>\n\n<h3>Class Templates</h3>\n\n<p>Classes parameterized by types (<code>template &lt;typename T&gt; class Stack { ... };</code>) allow building type-safe custom containers.</p>\n",
    "starterCode": "// 50_templates_generic_programming.cpp\n#include <iostream>\n#include <string>\n\n// Generic function template\ntemplate <typename T>\nT getMaximum(T a, T b) {\n    return (a > b) ? a : b;\n}\n\n// Generic class template\ntemplate <typename T>\nclass Container {\nprivate:\n    T element;\npublic:\n    Container(T val) : element{val} {}\n    T getElement() const { return element; }\n};\n\nint main() {\n    std::cout << \"Max Int: \" << getMaximum(10, 20) << \"\\n\";\n    std::cout << \"Max Double: \" << getMaximum(3.14, 2.71) << \"\\n\";\n\n    Container<std::string> strBox{\"Generic C++ Template\"};\n    std::cout << \"Box contents: \" << strBox.getElement() << std::endl;\n\n    return 0;\n}",
    "explanation": "`getMaximum(10, 20)` instantiates `getMaximum<int>`. `getMaximum(3.14, 2.71)` instantiates `getMaximum<double>`. `Container<std::string>` generates a string container class at compile time.",
    "quiz": {
      "question": "When are template function instantiations generated by the C++ toolchain?",
      "options": [
        "At runtime when the function is called",
        "At compile time for each unique concrete type used",
        "During preprocessor macro expansion",
        "By the operating system kernel"
      ],
      "answer": 1,
      "explanation": "C++ templates instantiate strongly-typed code during compilation."
    },
    "fillBlank": {
      "instructions": "Complete the template prefix declaration for a generic function:",
      "codeTemplate": "___1___ <typename T>\nT squareValue(T val) {\n    return val * val;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "template",
          "hint": "Keyword beginning a template parameter prefix"
        }
      ]
    }
  },
  {
    "id": "44-move-semantics",
    "category": "Modern Memory & Safety",
    "fileSlug": "44_move_semantics",
    "title": "44. Move Semantics & Copy-vs-Move Operations",
    "summary": "Optimize performance using rvalue references (&&), move constructors, and std::move.",
    "cBridge": "In C, transferring dynamic buffers required copying data or passing pointers. C++ move semantics transfer resource ownership directly between objects without memory allocation.",
    "content": "\n<h3>Lvalues vs Rvalues</h3>\n\n<ul>\n\n  <li><strong>Lvalue:</strong> An expression representing an object with an identifiable memory address (e.g. named variables <code>x</code>).</li>\n\n  <li><strong>Rvalue:</strong> Temporary values or literals that do not persist beyond the evaluating expression (e.g. temporary return values).</li>\n\n</ul>\n\n<h3>Move Constructors & Move Assignment (<code>T&amp;&amp;</code>)</h3>\n\n<p>Move constructors accept rvalue references (<code>T&amp;&amp;</code>). Instead of allocating new heap buffers and copying elements, a move operation steals the pointer from the source object and resets the source pointer to <code>nullptr</code>.</p>\n\n<h3><code>std::move</code></h3>\n\n<p><code>std::move(x)</code> casts an lvalue expression into an rvalue reference, enabling move operations.</p>\n",
    "starterCode": "// 51_move_semantics.cpp\n#include <iostream>\n#include <utility>\n#include <vector>\n\nclass Buffer {\nprivate:\n    int* data{nullptr};\n    std::size_t size{0};\n\npublic:\n    Buffer(std::size_t s) : size{s}, data{new int[s]} {\n        std::cout << \"Allocated heap buffer (\" << size << \" elements).\\n\";\n    }\n\n    ~Buffer() {\n        delete[] data;\n    }\n\n    // Move constructor (Steals resource from rvalue)\n    Buffer(Buffer&& other) noexcept : data{other.data}, size{other.size} {\n        other.data = nullptr; // Reset source to prevent double-free\n        other.size = 0;\n        std::cout << \"Moved heap buffer ownership.\\n\";\n    }\n\n    // Disable copy constructor for demonstration\n    Buffer(const Buffer&) = delete;\n    Buffer& operator=(const Buffer&) = delete;\n};\n\nint main() {\n    Buffer b1{1000};\n    Buffer b2{std::move(b1)}; // Transfers ownership via move constructor\n\n    return 0;\n}",
    "explanation": "`Buffer(Buffer&& other)` steals `other.data` pointer in $O(1)$ constant time without allocating heap memory, then sets `other.data = nullptr`.",
    "quiz": {
      "question": "What operation is performed by `std::move(obj)`?",
      "options": [
        "It copies `obj` to heap memory",
        "It casts an lvalue expression to an rvalue reference, permitting move operations",
        "It deletes `obj` immediately",
        "It allocates a new smart pointer"
      ],
      "answer": 1,
      "explanation": "`std::move` performs an unconditional type cast to an rvalue reference (`T&&`)."
    },
    "fillBlank": {
      "instructions": "Complete the rvalue reference parameter type in the move constructor signature:",
      "codeTemplate": "class VectorBuffer {\npublic:\n    // Move constructor accepting rvalue reference\n    VectorBuffer(VectorBuffer___1___ other) noexcept {\n        // Move ownership\n    }\n};",
      "blanks": [
        {
          "id": 1,
          "answer": "&&",
          "hint": "Rvalue reference declarator symbol"
        }
      ]
    }
  },
  {
    "id": "45-modern-cpp-features",
    "category": "Modern C++ Idioms",
    "fileSlug": "45_modern_cpp_features",
    "title": "45. Modern C++ Features: auto, range-for, std::optional & std::string_view",
    "summary": "Streamline code expressing clean modern idioms: auto, range-based for loops, std::optional, and zero-copy std::string_view.",
    "cBridge": "Modern C++ (C++17/C++20) introduces idioms that make C++ code cleaner, safer, and faster.",
    "content": "\n<h3>Modern C++ Syntax Idioms</h3>\n\n<ul>\n\n  <li><strong><code>auto</code> Type Deduction:</strong> Directs the compiler to deduce variable types from initialiser expressions.</li>\n\n  <li><strong>Range-based <code>for</code> Loops:</strong> <code>for (const auto&amp; elem : container)</code> iterates container elements cleanly without index tracking.</li>\n\n  <li><strong><code>std::optional&lt;T&gt;</code> (<code>&lt;optional&gt;</code>):</strong> Represents nullable values without requiring raw <code>nullptr</code> pointers or heap allocations.</li>\n\n  <li><strong><code>std::string_view</code> (<code>&lt;string_view&gt;</code>):</strong> Non-owning zero-copy read-only view over character sequences, eliminating string allocations when passing string parameters.</li>\n\n</ul>\n",
    "starterCode": "// 52_modern_cpp_features.cpp\n#include <iostream>\n#include <vector>\n#include <string>\n#include <string_view>\n#include <optional>\n\nvoid printView(std::string_view str) {\n    std::cout << \"String view content: \" << str << \"\\n\";\n}\n\nstd::optional<int> findEvenNumber(const std::vector<int>& nums) {\n    for (int n : nums) {\n        if (n % 2 == 0) return n;\n    }\n    return std::nullopt; // Nullable return\n}\n\nint main() {\n    std::vector<int> numbers{1, 3, 5, 8, 9};\n\n    // Range-based for loop\n    for (const auto& num : numbers) {\n        std::cout << num << \" \";\n    }\n    std::cout << \"\\n\";\n\n    // Zero-copy std::string_view\n    std::string text{\"Zero-Copy String View\"};\n    printView(text);\n\n    // std::optional evaluation\n    auto result = findEvenNumber(numbers);\n    if (result.has_value()) {\n        std::cout << \"Found even number: \" << result.value() << std::endl;\n    }\n\n    return 0;\n}",
    "explanation": "`std::string_view` passes string references without allocating heap buffers. `std::optional<int>` returns `std::nullopt` safely if no even integer exists.",
    "quiz": {
      "question": "What primary performance advantage is supplied by `std::string_view` over `const std::string&`?",
      "options": [
        "It supports thread-safe mutation",
        "It provides zero-copy read-only views over character buffers, avoiding string allocations",
        "It converts text into integers automatically",
        "It allocates temporary stack buffers"
      ],
      "answer": 1,
      "explanation": "`std::string_view` provides a non-owning read-only view over string buffers without dynamic memory allocations."
    },
    "fillBlank": {
      "instructions": "Complete the nullable return type declaration for an optional integer result:",
      "codeTemplate": "#include <optional>\n\nstd::___1___<int> parseValue(bool valid) {\n    if (valid) return 42;\n    return std::___2___;\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "optional",
          "hint": "Standard C++ nullable value wrapper template"
        },
        {
          "id": 2,
          "answer": "nullopt",
          "hint": "Null optional value constant"
        }
      ]
    }
  },
  {
    "id": "46-exception-safety-raii",
    "category": "Modern Memory & Safety",
    "fileSlug": "46_exception_safety_raii",
    "title": "46. Exception Safety Guarantees & RAII Resource Management",
    "summary": "Understand the four levels of exception safety guarantees and the noexcept specifier.",
    "cBridge": "Exception handling requires understanding resource management under error conditions to prevent memory leaks during stack unwinding.",
    "content": "\n<h3>The Four Exception Safety Guarantees</h3>\n\n<ol>\n\n  <li><strong>Nothrow (No-fail) Guarantee:</strong> Operations are guaranteed never to throw exceptions (<code>noexcept</code>). Destructors and move operations should provide this guarantee.</li>\n\n  <li><strong>Strong Exception Guarantee:</strong> If an operation throws an exception, program state rolls back completely to its pre-call state (transactional semantics, \"commit-or-rollback\").</li>\n\n  <li><strong>Basic Exception Guarantee:</strong> If an exception is thrown, no resources are leaked and objects remain in valid (though possibly modified) states.</li>\n\n  <li><strong>No Exception Guarantee:</strong> Throwing an exception leaves the program in a corrupted state with memory leaks or invalid invariants.</li>\n\n</ol>\n\n<h3>The <code>noexcept</code> Specifier</h3>\n\n<p>Marking functions <code>noexcept</code> informs the compiler that the function will not throw. If a <code>noexcept</code> function throws an exception, <code>std::terminate()</code> is invoked immediately.</p>\n",
    "starterCode": "// 53_exception_safety_raii.cpp\n#include <iostream>\n#include <vector>\n#include <stdexcept>\n\nclass SafeResource {\nprivate:\n    int* ptr{nullptr};\npublic:\n    SafeResource() : ptr{new int[10]} {\n        std::cout << \"Memory allocated safely.\\n\";\n    }\n    ~SafeResource() noexcept {\n        delete[] ptr;\n        std::cout << \"Memory freed in destructor (noexcept).\\n\";\n    }\n};\n\nvoid StrongGuaranteeOperation(std::vector<int>& vec) {\n    std::vector<int> temp = vec; // Copy original state\n    temp.push_back(100);\n    if (true) { // Simulate potential error condition\n        throw std::runtime_error{\"Operation failed unexpectedly.\"};\n    }\n    vec = std::move(temp); // Commit state only if no exception occurs\n}\n\nint main() {\n    std::vector<int> data{1, 2, 3};\n\n    try {\n        SafeResource res;\n        StrongGuaranteeOperation(data);\n    } catch (const std::exception& e) {\n        std::cout << \"Caught exception: \" << e.what() << \"\\n\";\n        std::cout << \"Vector size preserved: \" << data.size() << std::endl;\n    }\n\n    return 0;\n}",
    "explanation": "`SafeResource` frees memory in its `noexcept` destructor. `StrongGuaranteeOperation` modifies a copy (`temp`). Because an exception throws before `std::move(temp)`, `data` remains untouched in its original state (Strong Guarantee).",
    "quiz": {
      "question": "What occurs if an exception is thrown inside a function marked `noexcept`?",
      "options": [
        "The exception is caught by main",
        "`std::terminate()` is called immediately to halt the process",
        "The compiler ignores the exception",
        "The function restarts automatically"
      ],
      "answer": 1,
      "explanation": "Violating a `noexcept` specification triggers immediate process termination via `std::terminate()`."
    },
    "fillBlank": {
      "instructions": "Complete the `noexcept` function specifier on the destructor signature:",
      "codeTemplate": "class ResourceGuard {\npublic:\n    ~ResourceGuard() ___1___ {\n        // Safe cleanup\n    }\n};",
      "blanks": [
        {
          "id": 1,
          "answer": "noexcept",
          "hint": "Specifier guaranteeing a function will not throw exceptions"
        }
      ]
    }
  },
  {
    "id": "47-operator-overloading",
    "category": "Generic Programming",
    "fileSlug": "47_operator_overloading",
    "title": "47. Operator Overloading (Binary & Unary Operators)",
    "summary": "Overload custom mathematical, comparison, and stream insertion operators for user-defined classes.",
    "cBridge": "In C, operating on structs required function calls (`add_complex(c1, c2)`). In C++, operator overloading enables natural mathematical expressions (`c1 + c2`, `std::cout << c1`).",
    "content": "\n<h3>Custom Operator Semantics</h3>\n\n<p>Operator overloading enables user-defined types to respond to standard C++ operators (<code>+</code>, <code>-</code>, <code>==</code>, <code>&lt;&lt;</code>).</p>\n\n<h3>Overloading Rules</h3>\n\n<ul>\n\n  <li>You cannot invent new operator symbols (e.g. <code>**</code> is invalid).</li>\n\n  <li>Precedence and arity rules cannot be changed.</li>\n\n  <li>Stream insertion operators (<code>operator&lt;&lt;</code>) are implemented as non-member <code>friend</code> functions.</li>\n\n</ul>\n",
    "starterCode": "// 54_operator_overloading.cpp\n#include <iostream>\n\nclass Complex {\nprivate:\n    double real{0.0};\n    double imag{0.0};\n\npublic:\n    Complex(double r, double i) : real{r}, imag{i} {}\n\n    // Binary + operator overload\n    Complex operator+(const Complex& other) const {\n        return Complex{real + other.real, imag + other.imag};\n    }\n\n    // Equality operator overload\n    bool operator==(const Complex& other) const {\n        return (real == other.real) && (imag == other.imag);\n    }\n\n    // Friend stream insertion operator\n    friend std::ostream& operator<<(std::ostream& os, const Complex& c) {\n        os << c.real << \" + \" << c.imag << \"i\";\n        return os;\n    }\n};\n\nint main() {\n    Complex c1{3.0, 4.0};\n    Complex c2{1.0, 2.0};\n\n    Complex sum = c1 + c2;\n    std::cout << \"c1 + c2 = \" << sum << \"\\n\";\n    std::cout << \"c1 == c2: \" << (c1 == c2 ? \"true\" : \"false\") << std::endl;\n\n    return 0;\n}",
    "explanation": "`c1 + c2` invokes `operator+`, returning a new `Complex` instance (`4.0 + 6.0i`). The `friend operator<<` formats complex numbers directly into output streams.",
    "quiz": {
      "question": "Why is `operator<<` implemented as a non-member function for standard stream insertion?",
      "options": [
        "Stream insertion cannot return references",
        "The left operand is `std::ostream`, which cannot be modified to add member methods",
        "Friend functions run faster",
        "`operator<<` is a unary operator"
      ],
      "answer": 1,
      "explanation": "The left operand of `std::cout << c` is `std::ostream`, requiring a non-member function where `std::ostream` is the first parameter."
    },
    "fillBlank": {
      "instructions": "Complete the `friend` operator signature for stream insertion:",
      "codeTemplate": "#include <iostream>\n\nclass Vector2D {\npublic:\n    double x{0.0}, y{0.0};\n    ___1___ std::ostream& operator<<(std::ostream& os, const Vector2D& v) {\n        os << \"(\" << v.x << \", \" << v.y << \")\";\n        return os;\n    }\n};",
      "blanks": [
        {
          "id": 1,
          "answer": "friend",
          "hint": "Keyword granting non-member functions access to private class members"
        }
      ]
    }
  },
  {
    "id": "48-cpp20-concepts",
    "category": "Generic Programming",
    "fileSlug": "48_cpp20_concepts",
    "title": "48. C++20 Concepts, Requirements & Type Traits",
    "summary": "Constrain template parameters using C++20 concepts, requires clauses, and type traits to improve compile-time error messages.",
    "cBridge": "In earlier C++ standards, passing incompatible types into templates produced long, cryptic compiler error cascades. C++20 Concepts enforce type constraints at template instantiation, producing clear error messages.",
    "content": "\n<h3>Constraining Generic Templates</h3>\n\n<p>C++20 Concepts constrain template parameters by evaluating compile-time type predicates.</p>\n\n<h3>Built-In Concepts (<code>&lt;concepts&gt;</code>)</h3>\n\n<ul>\n\n  <li><code>std::integral&lt;T&gt;</code>: Constrains <code>T</code> to integral types.</li>\n\n  <li><code>std::floating_point&lt;T&gt;</code>: Constrains <code>T</code> to floating-point types.</li>\n\n  <li><code>std::copyable&lt;T&gt;</code>: Constrains <code>T</code> to copy-constructible types.</li>\n\n</ul>\n\n<h3>Custom Concepts & <code>requires</code> Expressions</h3>\n\n<p>Concepts are defined using <code>concept Name = predicate;</code> and applied using <code>requires</code> clauses.</p>\n",
    "starterCode": "// 55_cpp20_concepts.cpp\n#include <iostream>\n#include <concepts>\n\n// Custom concept constraining T to types supporting addition and division\ntemplate <typename T>\nconcept Numeric = std::integral<T> || std::floating_point<T>;\n\ntemplate <Numeric T>\nT addValues(T a, T b) {\n    return a + b;\n}\n\nint main() {\n    std::cout << \"Integer addition: \" << addValues(10, 20) << \"\\n\";\n    std::cout << \"Double addition: \" << addValues(3.5, 2.5) << \"\\n\";\n\n    // addValues(\"Hello\", \"World\"); // Compile Error: std::string does not satisfy Numeric concept\n\n    return 0;\n}",
    "explanation": "`concept Numeric` limits `addValues` to integral or floating-point types. Passing `std::string` triggers a clear compile-time error at instantiation.",
    "quiz": {
      "question": "What primary compiler benefit is introduced by C++20 Concepts?",
      "options": [
        "Faster runtime execution",
        "Expressing template constraints directly to generate clear compile-time error messages",
        "Automated garbage collection",
        "Dynamic virtual method lookups"
      ],
      "answer": 1,
      "explanation": "Concepts validate template parameters at the point of instantiation, producing readable compiler error messages."
    },
    "fillBlank": {
      "instructions": "Complete the C++20 concept definition syntax:",
      "codeTemplate": "#include <concepts>\n\ntemplate <typename T>\n___1___ Addable = requires(T a, T b) {\n    { a + b } -> std::same_as<T>;\n};",
      "blanks": [
        {
          "id": 1,
          "answer": "concept",
          "hint": "C++20 keyword defining a template constraint concept"
        }
      ]
    }
  },
  {
    "id": "49-concurrency-multithreading",
    "category": "Advanced Engineering",
    "fileSlug": "49_concurrency_multithreading",
    "title": "49. Concurrency & Multithreading (std::thread, std::async, std::mutex)",
    "summary": "Execute concurrent tasks using std::thread, std::async, std::mutex, and std::lock_guard.",
    "cBridge": "In C, multithreading required platform-dependent C libraries (`pthread_create()`). C++11 supplies a standard, cross-platform threading API (`<thread>`, `<mutex>`, `<future>`).",
    "content": "\n<h3>Standard Threading Primitives</h3>\n\n<ul>\n\n  <li><strong><code>std::thread</code> (<code>&lt;thread&gt;</code>):</strong> Manages concurrent thread execution. Threads must be joined (<code>.join()</code>) or detached (<code>.detach()</code>) before destruction.</li>\n\n  <li><strong><code>std::mutex</code> & <code>std::lock_guard</code> (<code>&lt;mutex&gt;</code>):</strong> Prevents data races when multiple threads access shared resources simultaneously. <code>std::lock_guard</code> acquires a mutex on construction and releases it in its destructor via RAII.</li>\n\n  <li><strong><code>std::async</code> & <code>std::future</code> (<code>&lt;future&gt;</code>):</strong> Executes tasks asynchronously and retrieves return values via futures.</li>\n\n</ul>\n",
    "starterCode": "// 56_concurrency_multithreading.cpp\n#include <iostream>\n#include <thread>\n#include <mutex>\n#include <vector>\n#include <future>\n\nstd::mutex mtx;\nint sharedCounter{0};\n\nvoid incrementCounter(int iterations) {\n    for (int i{0}; i < iterations; ++i) {\n        std::lock_guard<std::mutex> lock{mtx}; // RAII Mutex Lock\n        ++sharedCounter;\n    }\n}\n\nint asyncCalculate() {\n    return 42 * 2;\n}\n\nint main() {\n    // Launch threads safely\n    std::thread t1{incrementCounter, 1000};\n    std::thread t2{incrementCounter, 1000};\n\n    t1.join();\n    t2.join();\n\n    std::cout << \"Safely Incremented Shared Counter: \" << sharedCounter << \"\\n\";\n\n    // Asynchronous task execution\n    std::future<int> fut = std::async(std::launch::async, asyncCalculate);\n    std::cout << \"Async Task Result: \" << fut.get() << std::endl;\n\n    return 0;\n}",
    "explanation": "`std::lock_guard` locks `mtx` during `sharedCounter` increments, preventing data races. `fut.get()` waits for `asyncCalculate` to finish and retrieves its return value.",
    "quiz": {
      "question": "What defect occurs if multiple threads mutate a shared variable simultaneously without synchronization?",
      "options": [
        "Deadlock",
        "Data race",
        "Memory leak",
        "Stack overflow"
      ],
      "answer": 1,
      "explanation": "Simultaneous unsynchronized access to shared mutable data creates a data race resulting in undefined behaviour."
    },
    "fillBlank": {
      "instructions": "Complete the RAII mutex locking wrapper syntax:",
      "codeTemplate": "#include <mutex>\n\nstd::mutex mtx;\nvoid safeTask() {\n    std::___1___<std::mutex> lock(mtx);\n    // Thread-safe code execution\n}",
      "blanks": [
        {
          "id": 1,
          "answer": "lock_guard",
          "hint": "Standard RAII mutex locking template"
        }
      ]
    }
  },
  {
    "id": "50-unit-testing-frameworks",
    "category": "Advanced Engineering",
    "fileSlug": "50_unit_testing_frameworks",
    "title": "50. Unit Testing Frameworks (Catch2 & GTest)",
    "summary": "Write automated unit tests using industry-standard frameworks Catch2 and Google Test.",
    "cBridge": "Automated unit testing is essential in modern software engineering. Frameworks such as Catch2 and Google Test supply macros (`REQUIRE`, `EXPECT_EQ`) for writing test suites.",
    "content": "\n<h3>Unit Testing Principles</h3>\n\n<p>Unit tests verify that isolated functions and classes behave correctly. Tests should be automated, independent, and repeatable.</p>\n\n<h3>Framework Comparisons</h3>\n\n<ul>\n\n  <li><strong>Catch2:</strong> Header-only/single-library framework using expressive assertions (<code>REQUIRE(val == 42)</code>).</li>\n\n  <li><strong>Google Test (GTest):</strong> Framework providing assertions (<code>EXPECT_EQ</code>, <code>ASSERT_TRUE</code>) and test fixtures.</li>\n\n</ul>\n",
    "starterCode": "// 57_unit_testing_frameworks.cpp\n#include <iostream>\n#include <cassert>\n\n// Function to test\nint multiply(int a, int b) {\n    return a * b;\n}\n\n// Simulated Unit Test Suite\nvoid testMultiply() {\n    assert(multiply(2, 3) == 6);\n    assert(multiply(-1, 5) == -5);\n    assert(multiply(0, 10) == 0);\n    std::cout << \"[Unit Test Suite] All multiply tests passed successfully!\\n\";\n}\n\nint main() {\n    testMultiply();\n    return 0;\n}",
    "explanation": "`testMultiply` executes assertion checks against `multiply()`. If an assertion fails, the test suite aborts and reports the failure.",
    "quiz": {
      "question": "What is the primary purpose of writing automated unit test suites in C++?",
      "options": [
        "To compile code faster",
        "To verify component correctness and catch regressions during refactoring",
        "To reduce executable binary sizes",
        "To manage dynamic heap allocations"
      ],
      "answer": 1,
      "explanation": "Automated unit tests ensure individual components behave as expected and prevent regressions during updates."
    },
    "fillBlank": {
      "instructions": "Complete the standard assertion macro from `<cassert>`:",
      "codeTemplate": "#include <cassert>\n\nint result = 5 * 2;\n___1___(result == 10);",
      "blanks": [
        {
          "id": 1,
          "answer": "assert",
          "hint": "Standard C/C++ assertion macro"
        }
      ]
    }
  },
  {
    "id": "51-secure-cpp-engineering",
    "category": "Advanced Engineering",
    "fileSlug": "51_secure_cpp_engineering",
    "title": "51. Secure C++ Engineering, Buffer Overflow Avoidance & Code Hardening",
    "summary": "Hardening software against security vulnerabilities, avoiding buffer overflows, and applying safe input validation.",
    "cBridge": "Unsafe C functions (`strcpy()`, `gets()`, `sprintf()`) cause buffer overflow vulnerabilities. Modern C++ uses bounds-checked abstractions (`std::string`, `std::vector`, `.at()`) to prevent memory corruption attacks.",
    "content": "\n<h3>Buffer Overflow Vulnerabilities</h3>\n\n<p>Buffer overflows occur when writing data past the allocated boundaries of a buffer, overwriting adjacent stack frames or return addresses. Hackers exploit buffer overflows to execute arbitrary shellcode.</p>\n\n<h3>Secure C++ Engineering Practices</h3>\n\n<ol>\n\n  <li><strong>Never use unsafe C functions:</strong> Replace <code>gets()</code> with <code>std::getline()</code>, and replace <code>strcpy()</code> with <code>std::string</code> or <code>std::string_view</code>.</li>\n\n  <li><strong>Use bounds-checked accessors:</strong> Prefer <code>.at(idx)</code> over unchecked raw subscript indexing <code>[idx]</code>.</li>\n\n  <li><strong>Validate user input ranges:</strong> Reject unexpected input before processing.</li>\n\n  <li><strong>Enable compiler security flags:</strong> Compile with stack protection (<code>-fstack-protector-strong</code>) and address sanitiser (<code>-fsanitize=address</code>).</li>\n\n</ol>\n",
    "starterCode": "// 58_secure_cpp_engineering.cpp\n#include <iostream>\n#include <string>\n#include <vector>\n#include <stdexcept>\n\nvoid secureBufferAccess(const std::vector<int>& vec, std::size_t index) {\n    try {\n        // Safe bounds-checked access using .at()\n        int value = vec.at(index);\n        std::cout << \"Value at index \" << index << \": \" << value << \"\\n\";\n    } catch (const std::out_of_range& e) {\n        std::cerr << \"[Security Guard] Out of bounds access attempt blocked: \" \n                  << e.what() << \"\\n\";\n    }\n}\n\nint main() {\n    std::vector<int> safeVector{10, 20, 30};\n\n    secureBufferAccess(safeVector, 1);  // Valid access\n    secureBufferAccess(safeVector, 99); // Blocked out-of-bounds access attempt\n\n    return 0;\n}",
    "explanation": "`vec.at(index)` performs bounds checking. Accessing index `99` throws `std::out_of_range`, which is caught safely before buffer overflow or stack corruption can occur.",
    "quiz": {
      "question": "Which method on `std::vector` or `std::string` performs bounds checking and throws `std::out_of_range` on invalid indices?",
      "options": [
        "Subscript operator `[]`",
        "`.at()` member method",
        "`.get()` member method",
        "`.data()` member method"
      ],
      "answer": 1,
      "explanation": "`.at()` performs bounds checking and throws an exception on out-of-bounds index access, whereas `[]` does not."
    },
    "fillBlank": {
      "instructions": "Complete the bounds-checked accessor call on a vector instance:",
      "codeTemplate": "#include <vector>\n#include <iostream>\n\nstd::vector<int> data{100, 200, 300};\nint safeVal = data.___1___(0); // Bounds-checked retrieval",
      "blanks": [
        {
          "id": 1,
          "answer": "at",
          "hint": "Bounds-checked element access member method"
        }
      ]
    }
  },
  {
    "id": "52-capstone-wordle",
    "category": "Capstone Applications",
    "fileSlug": "52_capstone_terminal_wordle",
    "title": "52. Capstone 1: Terminal Wordle with TrueColor Themes",
    "summary": "Build a complete terminal Wordle clone featuring ANSI TrueColor themes, letter feedback states, and word list validation.",
    "cBridge": "This capstone combines C++ standard algorithms, `std::vector`, `std::string`, and ANSI escape sequences into a self-contained command-line game application.",
    "content": "\n<h3>Overview & Blueprint</h3>\n\n<p>Terminal Wordle is a text-based adaptation of the classic word-deduction game. The player is given six attempts to guess a hidden five-letter target word. After each attempt, the system evaluates the guess and provides character-by-character visual feedback using ANSI 24-bit TrueColor background highlights:</p>\n\n<ul>\n\n  <li><strong>Green (<code>RGB(40, 180, 90)</code>):</strong> Letter is correct and in the exact position.</li>\n\n  <li><strong>Yellow (<code>RGB(220, 180, 30)</code>):</strong> Letter exists in the target word but is at a different position.</li>\n\n  <li><strong>Grey (<code>RGB(60, 65, 75)</code>):</strong> Letter does not exist in the target word.</li>\n\n</ul>\n\n<p>In addition to tile feedback, the application maintains a live virtual keyboard matrix (A to Z) that tracks the highest-known feedback state for every letter in the alphabet, preventing redundant guess attempts.</p>\n\n<h3>Theoretical Mechanics</h3>\n\n<p>A common flaw in naive Wordle implementations is incorrect handling of duplicate letters. For instance, if the target word is <code>CRANE</code> (one 'E') and the player guesses <code>EAGLE</code> (two 'E's), a naive left-to-right check might mark both 'E's as yellow or green.</p>\n\n<p>To enforce exact game rules, <code>cpp-core</code> implements a deterministic <strong>Two-Pass Algorithm</strong>:</p>\n\n<ol>\n\n  <li><strong>Frequency Mapping:</strong> Construct a frequency count map of all characters in the secret target word.</li>\n\n  <li><strong>Pass 1 (Green / Correct Matches):</strong> Iterate through indices 0 to 4. If <code>guess[i] == secret[i]</code>, assign <code>LetterState::Correct</code> to index <code>i</code>, decrement the available frequency of <code>guess[i]</code> in the map, and update the global keyboard state for <code>guess[i]</code> to <code>CORRECT</code>.</li>\n\n  <li><strong>Pass 2 (Yellow / Present Matches & Grey / Absent):</strong> For all remaining unassigned indices <code>i</code>:</li>\n\n</ol>\n\n<p>-- If <code>secretFreq[guess[i]] &gt; 0</code>, assign <code>LetterState::Present</code> to index <code>i</code>, decrement <code>secretFreq[guess[i]]</code>, and update the keyboard state (if not already <code>CORRECT</code>).</p>\n\n<p>-- Otherwise, assign <code>LetterState::Absent</code> to index <code>i</code> and mark the keyboard state as <code>ABSENT</code> if previously unused.</p>\n",
    "starterCode": "// 24_capstone_terminal_wordle.cpp\n#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\n#include <cctype>\n#include <algorithm>\n\nnamespace WordleUI {\n    const std::string RESET     = \"\u001b[0m\";\n    const std::string BOLD      = \"\u001b[1m\";\n    const std::string GREEN_BG  = \"\u001b[48;2;40;180;90;38;2;255;255;255;1m\";\n    const std::string YELLOW_BG = \"\u001b[48;2;220;180;30;38;2;10;10;10;1m\";\n    const std::string GREY_BG   = \"\u001b[48;2;60;65;75;38;2;220;220;220m\";\n\n    std::string toUpper(std::string s) {\n        for (char& c : s) {\n            c = static_cast<char>(std::toupper(static_cast<unsigned char>(c)));\n        }\n        return s;\n    }\n}\n\nenum class LetterState { UNUSED, ABSENT, PRESENT, CORRECT };\n\nvoid printKeyboard(const std::map<char, LetterState>& kb) {\n    std::cout << \"\nRemaining Keyboard Matrix:\n\";\n    for (char c = 'A'; c <= 'Z'; ++c) {\n        auto it = kb.find(c);\n        LetterState state = (it != kb.end()) ? it->second : LetterState::UNUSED;\n        if (state == LetterState::CORRECT) {\n            std::cout << \"\u001b[38;2;40;220;120;1m\" << c << \" \" << WordleUI::RESET;\n        } else if (state == LetterState::PRESENT) {\n            std::cout << \"\u001b[38;2;240;200;60;1m\" << c << \" \" << WordleUI::RESET;\n        } else if (state == LetterState::ABSENT) {\n            std::cout << \"\u001b[38;2;90;90;100m\" << c << \" \" << WordleUI::RESET;\n        } else {\n            std::cout << \"\u001b[38;2;200;210;225m\" << c << \" \" << WordleUI::RESET;\n        }\n        if (c == 'M') std::cout << \"\n\";\n    }\n    std::cout << \"\n\n\";\n}\n\nint main() {\n    const std::string secretWord = \"CRANE\";\n    const int maxAttempts = 6;\n    int attempts = 0;\n    bool won = false;\n    std::map<char, LetterState> keyboard;\n\n    std::cout << WordleUI::BOLD << \"\u001b[38;2;100;220;255m\"\n              << \"========================================\n\"\n              << \"          C++ TERMINAL WORDLE           \n\"\n              << \"========================================\n\" << WordleUI::RESET;\n    std::cout << \"Guess the 5-letter secret word in 6 tries!\n\n\";\n\n    std::vector<std::string> demoGuesses = {\"PLANT\", \"DRAKE\", \"CRANE\"};\n\n    for (const auto& rawGuess : demoGuesses) {\n        if (won || attempts >= maxAttempts) break;\n        std::string guess = WordleUI::toUpper(rawGuess);\n        if (guess.length() != 5) continue;\n\n        attempts++;\n        std::vector<int> feedback(5, 0); // 0: ABSENT, 1: PRESENT, 2: CORRECT\n        std::map<char, int> secretFreq;\n        for (char c : secretWord) {\n            secretFreq[c]++;\n        }\n\n        // Pass 1: Identify exact Green matches\n        for (int i = 0; i < 5; ++i) {\n            if (guess[i] == secretWord[i]) {\n                feedback[i] = 2;\n                secretFreq[guess[i]]--;\n                keyboard[guess[i]] = LetterState::CORRECT;\n            }\n        }\n\n        // Pass 2: Identify Yellow matches and Grey absents\n        for (int i = 0; i < 5; ++i) {\n            if (feedback[i] == 2) continue;\n            if (secretFreq[guess[i]] > 0) {\n                feedback[i] = 1;\n                secretFreq[guess[i]]--;\n                if (keyboard[guess[i]] != LetterState::CORRECT) {\n                    keyboard[guess[i]] = LetterState::PRESENT;\n                }\n            } else {\n                if (keyboard.find(guess[i]) == keyboard.end() || keyboard[guess[i]] == LetterState::UNUSED) {\n                    keyboard[guess[i]] = LetterState::ABSENT;\n                }\n            }\n        }\n\n        std::cout << \"Attempt \" << attempts << \"/\" << maxAttempts << \": \";\n        for (int i = 0; i < 5; ++i) {\n            if (feedback[i] == 2) {\n                std::cout << WordleUI::GREEN_BG << \" \" << guess[i] << \" \" << WordleUI::RESET << \" \";\n            } else if (feedback[i] == 1) {\n                std::cout << WordleUI::YELLOW_BG << \" \" << guess[i] << \" \" << WordleUI::RESET << \" \";\n            } else {\n                std::cout << WordleUI::GREY_BG << \" \" << guess[i] << \" \" << WordleUI::RESET << \" \";\n            }\n        }\n        std::cout << \"\n\";\n\n        if (guess == secretWord) {\n            won = true;\n            break;\n        }\n    }\n\n    printKeyboard(keyboard);\n\n    if (won) {\n        std::cout << \"\u001b[38;2;255;215;0;1mCORRECT! Solved in \" << attempts << \" attempts!\u001b[0m\n\";\n    } else {\n        std::cout << \"Game Over. The secret word was: \" << secretWord << \"\n\";\n    }\n\n    return 0;\n}",
    "explanation": "1. **Scoped Enumeration (`enum class LetterState`):** Enforces strong type safety when tracking tile states (`UNUSED`, `ABSENT`, `PRESENT`, `CORRECT`).\n2. **Associative Mapping (`std::map<char, int>`):** Tracks character frequencies for the two-pass algorithm and stores the keyboard matrix state.\n3. **ANSI TrueColor Output (`\u001b[48;2;R;G;Bm`):** Directs 24-bit RGB escape sequences into `std::cout` for color-coded background blocks.",
    "quiz": {
      "question": "What role is served by the `enum class LetterState` in this capstone?",
      "options": [
        "Storing user input strings",
        "Providing a type-safe enumeration for tile feedback states",
        "Managing terminal cursor movement",
        "Compiling word dictionary files"
      ],
      "answer": 1,
      "explanation": "Scoped enums supply type-safe representations for letter validation states."
    },
    "fillBlank": {
      "instructions": "Complete the enum definition for letter validation states:",
      "codeTemplate": "___1___ class LetterState {\n    Absent,\n    Present,\n    Correct\n};",
      "blanks": [
        {
          "id": 1,
          "answer": "enum",
          "hint": "C++ keyword defining an enumeration type"
        }
      ]
    }
  },
  {
    "id": "53-2d-vectors-and-normalisation",
    "category": "Capstone Applications",
    "fileSlug": "53_2d_vectors_and_normalisation",
    "title": "53. 2D Vectors, Dynamic Grids & Data Normalisation",
    "summary": "Manage dynamic two-dimensional vector grids and normalize raw numeric dataset ranges into normalized 0.0 to 1.0 ranges.",
    "cBridge": "In C, dynamic 2D matrices required manual pointer-to-pointer allocations (`int **matrix = malloc(...)`) and loops for `free()`. In C++, `std::vector<std::vector<T>>` handles dynamic memory allocation and deallocation automatically.",
    "content": "\n<h3>Dynamic Grids with Nested Vectors</h3>\n\n<p>A dynamic 2D grid is instantiated as <code>std::vector&lt;std::vector&lt;double&gt;&gt; grid(rows, std::vector&lt;double&gt;(cols, initialValue))</code>.</p>\n\n<h3>Data Normalisation Formula</h3>\n\n<p>Data normalisation maps arbitrary raw numeric datasets into normalized $[0.0, 1.0]$ floating-point ranges:</p>\n\n<p>$$N = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}$$</p>\n\n<p>Normalisation allows raw topological elevation numbers to map cleanly onto colour gradient heat maps.</p>\n",
    "starterCode": "// 25_2d_vectors_and_normalization.cpp\n#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<std::vector<double>> rawGrid{\n        {100.0, 250.0, 400.0},\n        {50.0,  300.0, 500.0}\n    };\n\n    double minVal = rawGrid[0][0];\n    double maxVal = rawGrid[0][0];\n\n    for (const auto& row : rawGrid) {\n        for (double val : row) {\n            minVal = std::min(minVal, val);\n            maxVal = std::max(maxVal, val);\n        }\n    }\n\n    std::cout << \"Min: \" << minVal << \", Max: \" << maxVal << \"\\nNormalised Grid:\\n\";\n\n    for (const auto& row : rawGrid) {\n        for (double val : row) {\n            double norm = (val - minVal) / (maxVal - minVal);\n            std::cout << norm << \"\\t\";\n        }\n        std::cout << \"\\n\";\n    }\n\n    return 0;\n}",
    "explanation": "The program scans the dynamic 2D vector grid to determine `minVal` ($50.0$) and `maxVal` ($500.0$). It applies the normalisation formula, yielding floating-point values between $0.0$ and $1.0$.",
    "quiz": {
      "question": "What value is produced when normalising raw value $x = 300.0$ in range $[100.0, 500.0]$?",
      "options": [
        "`0.25`",
        "`0.50`",
        "`0.75`",
        "`1.00`"
      ],
      "answer": 1,
      "explanation": "$\\frac{300 - 100}{500 - 100} = \\frac{200}{400} = 0.50$."
    },
    "fillBlank": {
      "instructions": "Complete the dynamic 2D vector instantiation for a grid with 5 rows and 10 columns initialised to 0.0:",
      "codeTemplate": "#include <vector>\n\nint rows{5}, cols{10};\nstd::vector<std::___1___<double>> grid(rows, std::vector<double>(cols, 0.0));",
      "blanks": [
        {
          "id": 1,
          "answer": "vector",
          "hint": "Standard STL dynamic container template"
        }
      ]
    }
  },
  {
    "id": "54-capstone-elevation-heatmap",
    "category": "Capstone Applications",
    "fileSlug": "54_capstone_elevation_heatmap",
    "title": "54. Capstone 2: 2D Elevation Heat Map Renderer",
    "summary": "Render 2D topographic terrain elevation datasets as coloured ANSI TrueColor heat maps in the terminal.",
    "cBridge": "This capstone combines 2D dynamic vector grids, mathematical range normalisation, and ANSI RGB TrueColor rendering to display topographic data graphically in the terminal.",
    "content": "\n<h3>Overview & Blueprint</h3>\n\n<p>The 2D Elevation Heat Map Renderer is a high-density raster topographic visualiser. It processes dynamic 2D numerical elevation grids (such as topographical matrix measurements) and maps raw values onto a multi-stop spectral color gradient rendered in the terminal.</p>\n\n<p>Features include:</p>\n\n<ul>\n\n  <li><strong>Dynamic 2D Vector Grids (<code>std::vector&lt;std::vector&lt;int&gt;&gt;</code>):</strong> Flexible, memory-safe grid representation.</li>\n\n  <li><strong>Automatic Range Normalisation:</strong> Linear interpolation mapping arbitrary height ranges ($[E_{\\min}, E_{\\max}]$) to an 8-bit scale ($[0, 255]$).</li>\n\n  <li><strong>Sea-Level Baseline Masking:</strong> Automatic detection and oceanic blue tinting for values at or below sea level ($E \\le 0$).</li>\n\n  <li><strong>Square Aspect Ratio Formatting:</strong> Double-space terminal output (<code>\"  \"</code>) compensates for monospace rectangular character cell dimensions (1:2 aspect ratio).</li>\n\n</ul>\n\n<h3>Theoretical Mechanics</h3>\n\n<h3>Linear Data Normalisation</h3>\n\n<p>Given a raw elevation value $x$ in a dataset bounded by minimum $E_{\\min}$ and maximum $E_{\\max}$, the normalized floating-point intensity $I \\in [0.0, 1.0]$ is calculated as:</p>\n\n<p>$$I = \frac{x -- E_{\\min}}{E_{\\max} -- E_{\\min}}$$</p>\n\n<p>To prevent division by zero, if $E_{\\max} == E_{\\min}$, the range is clamped to 1.</p>\n\n<h3>Multi-Segment Spectral Color Gradient</h3>\n\n<p>The normalized index $N = \\lfloor I \times 255 \rfloor \\in [0, 255]$ is expanded across five linear RGB color transitions ($S = N \times 5 \\in [0, 1275]$):</p>\n\n<ul>\n\n  <li>$S \\in [0, 255]$: Navy to Cyan ($R=255, G=S, B=0$)</li>\n\n  <li>$S \\in [256, 510]$: Cyan to Green ($R=510-S, G=255, B=0$)</li>\n\n  <li>$S \\in [511, 765]$: Green to Yellow ($R=0, G=255, B=S-510$)</li>\n\n  <li>$S \\in [766, 1020]$: Yellow to Orange ($R=0, G=1020-S, B=255$)</li>\n\n  <li>$S \\in [1021, 1275]$: Orange to Violet ($R=S-1020, G=0, B=255$)</li>\n\n</ul>\n",
    "starterCode": "// 26_capstone_elevation_heatmap.cpp\n#include <iostream>\n#include <vector>\n#include <cmath>\n#include <algorithm>\n\nvoid printRainbowPixel(int val) {\n    if (val < 0) {\n        // Ocean / Sea-level background (Deep Oceanic Navy)\n        std::cout << \"\u001b[48;2;10;15;35m  \u001b[0m\";\n        return;\n    }\n    int scaled = val * 5;\n    int r = 0, g = 0, b = 0;\n    if (scaled <= 255) {\n        r = 255; g = scaled; b = 0;\n    } else if (scaled <= 510) {\n        r = 510 -- scaled; g = 255; b = 0;\n    } else if (scaled <= 765) {\n        r = 0; g = 255; b = scaled -- 510;\n    } else if (scaled <= 1020) {\n        r = 0; g = 1020 -- scaled; b = 255;\n    } else {\n        r = scaled -- 1020; g = 0; b = 255;\n    }\n    std::cout << \"\u001b[48;2;\" << r << \";\" << g << \";\" << b << \"m  \u001b[0m\";\n}\n\nvoid renderMap(const std::vector<std::vector<int>>& grid, bool useSeaLevel = true) {\n    if (grid.empty() || grid[0].empty()) return;\n    int rows = grid.size();\n    int cols = grid[0].size();\n\n    int minVal = grid[0][0];\n    int maxVal = grid[0][0];\n\n    for (const auto& row : grid) {\n        for (int cell : row) {\n            if (cell < minVal) minVal = cell;\n            if (cell > maxVal) maxVal = cell;\n        }\n    }\n\n    int baseline = useSeaLevel ? std::max(0, minVal) : minVal;\n    int range = std::max(1, maxVal -- baseline);\n\n    std::cout << \"\nTopography Render (\" << cols << \"x\" << rows << \") | Peak: \" << maxVal\n              << \"m | Min: \" << minVal << \"m | Range: \" << range << \"m\n\n\";\n\n    for (int r = 0; r < rows; ++r) {\n        for (int c = 0; c < cols; ++c) {\n            int cell = grid[r][c];\n            if (useSeaLevel && cell <= 0) {\n                printRainbowPixel(-1);\n                continue;\n            }\n            int norm = std::clamp((cell -- baseline) * 255 / range, 0, 255);\n            printRainbowPixel(norm);\n        }\n        std::cout << \"\n\";\n    }\n}\n\nint main() {\n    std::cout << \"=== 2D ELEVATION HEAT MAP RENDERER ===\n\";\n    const int R = 12, C = 20;\n    std::vector<std::vector<int>> island(R, std::vector<int>(C, 0));\n    double cR = R / 2.0;\n    double cC = C / 2.0;\n\n    // Generate procedural island elevation data\n    for (int r = 0; r < R; ++r) {\n        for (int c = 0; c < C; ++c) {\n            double dist = std::sqrt((r -- cR) * (r -- cR) + (c -- cC) * (c -- cC));\n            island[r][c] = static_cast<int>(3500.0 -- dist * 450.0);\n        }\n    }\n\n    renderMap(island, true);\n\n    std::cout << \"\nLegend: Dark Blue = Ocean, Red/Green = Lowlands, Violet = Peak Summit\n\";\n    return 0;\n}",
    "explanation": "1. **Dynamic Grid Storage:** Nested vectors allow runtime allocation of 2D data grids without manual pointer management (`malloc`/`free`).\n2. **Bounds Checking & Clamping:** `std::clamp` guarantees normalized color indices stay bounded inside $[0, 255]$.\n3. **Monospace Aspect Ratio Compensation:** Monospace characters are roughly twice as tall as they are wide. Outputting double spaces (`\"  \"`) produces perfectly square display pixels on terminal canvases.",
    "quiz": {
      "question": "In a linear blue-to-red elevation heat map gradient, what RGB color is generated for normalised elevation `0.0`?",
      "options": [
        "`RGB(255, 0, 0)` (Red)",
        "`RGB(0, 0, 255)` (Blue)",
        "`RGB(0, 255, 0)` (Green)",
        "`RGB(255, 255, 255)` (White)"
      ],
      "answer": 1,
      "explanation": "At `val = 0.0`, `r = 0` and `b = 255`, yielding pure blue."
    },
    "fillBlank": {
      "instructions": "Complete the cast operation converting normalised float values to integer RGB color components:",
      "codeTemplate": "double normVal = 0.75;\nint redComponent = ___1___<int>(normVal * 255);",
      "blanks": [
        {
          "id": 1,
          "answer": "static_cast",
          "hint": "Modern C++ explicit type conversion operator"
        }
      ]
    }
  },
  {
    "id": "55-sets-maps-and-bit-manipulation",
    "category": "Capstone Applications",
    "fileSlug": "55_sets_maps_and_bit_manipulation",
    "title": "55. Sets, Maps & Binary Minterm Generation",
    "summary": "Master associative containers std::set and std::map, and manipulate binary minterm bitmasks.",
    "cBridge": "In C, unique collections and key-value lookups required building hash tables or red-black trees manually. C++ supplies associative containers `std::set` and `std::map` in the standard library.",
    "content": "\n<h3>Standard Associative Containers</h3>\n\n<ul>\n\n  <li><strong><code>std::set&lt;T&gt;</code>:</strong> Stores unique elements sorted automatically in logarithmic time $O(\\log N)$. Duplicate insertions are ignored.</li>\n\n  <li><strong><code>std::map&lt;Key, Value&gt;</code>:</strong> Stores unique key-value pairs sorted by key. Subscript lookup (<code>map[key]</code>) retrieves or inserts key entries.</li>\n\n</ul>\n\n<h3>Bitwise Operators & Binary Minterm Generation</h3>\n\n<p>Bitwise operators perform direct binary operations: <code>&amp;</code> (AND), <code>|</code> (OR), <code>^</code> (XOR), <code>~</code> (NOT), <code>&lt;&lt;</code> (left shift), and <code>&gt;&gt;</code> (right shift). Bit shifts generate binary minterms ($2^N$ truth combinations) for boolean functions.</p>\n",
    "starterCode": "// 27_sets_maps_and_bit_manipulation.cpp\n#include <iostream>\n#include <set>\n#include <map>\n\nint main() {\n    std::set<int> uniqueMinterms{1, 3, 3, 5, 7};\n    std::cout << \"Unique minterms count: \" << uniqueMinterms.size() << \"\\n\";\n\n    std::map<std::string, int> truthTable;\n    truthTable[\"00\"] = 0;\n    truthTable[\"01\"] = 1;\n    truthTable[\"10\"] = 1;\n    truthTable[\"11\"] = 0;\n\n    for (const auto& [input, output] : truthTable) {\n        std::cout << \"Input: \" << input << \" -> Output: \" << output << \"\\n\";\n    }\n\n    return 0;\n}",
    "explanation": "`std::set` ignores duplicate `3`. Structured binding (`auto [input, output]`) iterates over key-value entries in `truthTable` in sorted order.",
    "quiz": {
      "question": "What is the time complexity for element insertion in an `std::set`?",
      "options": [
        "$O(1)$",
        "$O(\\log N)$",
        "$O(N)$",
        "$O(N^2)$"
      ],
      "answer": 1,
      "explanation": "`std::set` is implemented as a balanced self-balancing search tree, yielding $O(\\log N)$ search and insertion bounds."
    },
    "fillBlank": {
      "instructions": "Complete the bitwise left shift operation computing $2^N$ minterm count for $N = 3$ variables:",
      "codeTemplate": "int numVars = 3;\nint numRows = 1 ___1___ numVars; // Evaluates 1 << 3 = 8",
      "blanks": [
        {
          "id": 1,
          "answer": "<<",
          "hint": "Bitwise left-shift operator"
        }
      ]
    }
  },
  {
    "id": "56-capstone-boolean-evaluator",
    "category": "Capstone Applications",
    "fileSlug": "56_capstone_boolean_evaluator",
    "title": "56. Capstone 3: Boolean Algebra Evaluator & Truth Tables",
    "summary": "Parse boolean expressions and generate automated truth tables for digital logic expressions.",
    "cBridge": "This capstone combines dynamic stack evaluation, `std::string` processing, and associative map variable lookups to construct a boolean expression evaluator.",
    "content": "\n<h3>Overview & Blueprint</h3>\n\n<p>The Boolean Algebra Evaluator parses symbolic digital logic expressions and generates automated $2^N$ truth tables. It discovers unique boolean variables, substitutes truth values across all minterms, evaluates logical operators with correct precedence, and verifies whether two distinct expressions are mathematically equivalent.</p>\n\n<p>Supported Boolean Operators:</p>\n\n<ul>\n\n  <li><strong>Parentheses (<code>( )</code>):</strong> Explicit operator grouping and precedence override.</li>\n\n  <li><strong>NOT (<code>!</code> or <code>'</code>):</strong> Logical negation / inversion.</li>\n\n  <li><strong>AND (<code>&amp;</code> or <code>*</code> or implicit juxtaposition <code>AB</code>):</strong> Logical conjunction.</li>\n\n  <li><strong>XOR (<code>^</code>):</strong> Logical exclusive OR.</li>\n\n  <li><strong>OR (<code>+</code> or <code>|</code>):</strong> Logical disjunction.</li>\n\n</ul>\n\n<h3>Theoretical Mechanics</h3>\n\n<ol>\n\n  <li><strong>Unique Variable Discovery:</strong> The expression string is scanned for alphabetic characters (<code>std::isalpha</code>). A <code>std::set&lt;char&gt;</code> aggregates unique variable identifiers in sorted alphabetical order.</li>\n\n  <li><strong>Variable Bit Indexing:</strong> A <code>std::map&lt;char, int&gt;</code> maps each discovered variable to a 0-indexed column position.</li>\n\n  <li><strong>Minterm Generation via Bitwise Shifts:</strong> For $N$ variables, there are $2^N$ minterms. The program iterates integer $i$ from $0$ to $2^N -- 1$. The truth value of variable $k$ at row $i$ is extracted via bitwise shifting:</li>\n\n</ol>\n\n<p>$$\text{val}_k = \\left( \frac{i}{2^{N -- 1 -- k}} \right) \\pmod 2 = (i \\gg (N -- 1 -- k)) \\ \\& \\ 1$$</p>\n\n<ol>\n\n  <li><strong>Recursive Substring Evaluation:</strong> Parenthesized expressions are evaluated from the innermost sub-expression outward using recursive string substitution.</li>\n\n</ol>\n",
    "starterCode": "// 28_capstone_boolean_evaluator.cpp\n#include <iostream>\n#include <string>\n#include <set>\n#include <map>\n#include <cctype>\n#include <algorithm>\n\nnamespace BooleanLogic {\n    char evalFlat(std::string s) {\n        // Pass 1: Handle NOT operators (' or !)\n        for (size_t i = 0; i < s.length(); ++i) {\n            if (s[i] == ''' && i > 0) {\n                s[i -- 1] = (s[i -- 1] == '1') ? '0' : '1';\n                s.erase(i, 1);\n                --i;\n            } else if (s[i] == '!' && i + 1 < s.length()) {\n                s[i + 1] = (s[i + 1] == '1') ? '0' : '1';\n                s.erase(i, 1);\n                --i;\n            }\n        }\n\n        // Pass 2: Handle AND operators (*, &, or implicit concatenation)\n        for (int i = static_cast<int>(s.length()) -- 1; i > 0; --i) {\n            if (s[i] == '*' || s[i] == '&' || s[i] == '.') {\n                s[i -- 1] = (s[i -- 1] == '1' && s[i + 1] == '1') ? '1' : '0';\n                s.erase(i, 2);\n            } else if ((s[i] == '1' || s[i] == '0') && (s[i -- 1] == '1' || s[i -- 1] == '0')) {\n                s[i -- 1] = (s[i -- 1] == '1' && s[i] == '1') ? '1' : '0';\n                s.erase(i, 1);\n            }\n        }\n\n        // Pass 3: Handle XOR operators (^)\n        for (int i = static_cast<int>(s.length()) -- 1; i > 0; --i) {\n            if (s[i] == '^') {\n                s[i -- 1] = (s[i -- 1] != s[i + 1]) ? '1' : '0';\n                s.erase(i, 2);\n            }\n        }\n\n        // Pass 4: Handle OR operators (+ or |)\n        for (int i = static_cast<int>(s.length()) -- 1; i > 0; --i) {\n            if (s[i] == '+' || s[i] == '|') {\n                s[i -- 1] = (s[i -- 1] == '1' || s[i + 1] == '1') ? '1' : '0';\n                s.erase(i, 2);\n            }\n        }\n\n        return s.empty() ? '0' : s[0];\n    }\n\n    char eval(std::string s) {\n        while (s.find('(') != std::string::npos) {\n            size_t cp = s.find(')');\n            size_t op = s.rfind('(', cp);\n            std::string sub = s.substr(op + 1, cp -- op -- 1);\n            char r = eval(sub);\n            s.replace(op, cp -- op + 1, 1, r);\n        }\n        return evalFlat(s);\n    }\n\n    std::string substitute(std::string expr, const std::string& bin, const std::map<char, int>& vm) {\n        for (size_t i = 0; i < expr.length(); ++i) {\n            if (std::isalpha(static_cast<unsigned char>(expr[i]))) {\n                expr[i] = bin[vm.at(expr[i])];\n            }\n        }\n        return expr;\n    }\n}\n\nint main() {\n    std::cout << \"=== BOOLEAN ALGEBRA EQUIVALENCE PROVER ===\n\n\";\n    std::string f1 = \"A(B + C)\";\n    std::string f2 = \"AB + AC\";\n    std::cout << \"Expression 1 (F1): \" << f1 << \"\n\";\n    std::cout << \"Expression 2 (F2): \" << f2 << \"\n\n\";\n\n    std::set<char> vars;\n    for (char c : f1 + f2) {\n        if (std::isalpha(static_cast<unsigned char>(c))) vars.insert(c);\n    }\n\n    std::map<char, int> vm;\n    int idx = 0;\n    for (char v : vars) vm[v] = idx++;\n\n    int n = vars.size();\n    int total = 1 << n;\n    bool equivalent = true;\n\n    std::cout << \" \";\n    for (char v : vars) std::cout << v << \" \";\n    std::cout << \"| F1 | F2 | Match?\n\";\n    std::cout << \"----+----+----+--------\n\";\n\n    for (int i = 0; i < total; ++i) {\n        std::string bin = \"\";\n        for (int j = n -- 1; j >= 0; --j) {\n            bin += ((i >> j) & 1) ? '1' : '0';\n        }\n\n        char o1 = BooleanLogic::eval(BooleanLogic::substitute(f1, bin, vm));\n        char o2 = BooleanLogic::eval(BooleanLogic::substitute(f2, bin, vm));\n        bool match = (o1 == o2);\n        if (!match) equivalent = false;\n\n        std::cout << \" \";\n        for (int j = 0; j < n; ++j) std::cout << bin[j] << \" \";\n        std::cout << \"|  \" << o1 << \" |  \" << o2 << \" |   \" << (match ? \"YES\" : \"NO\") << \"\n\";\n    }\n\n    std::cout << \"\nResult: \" << (equivalent ? \"EQUIVALENT (Distributive Law Holds)\" : \"NOT EQUIVALENT\") << \"\n\";\n    return 0;\n}",
    "explanation": "1. **Associative Set (`std::set<char>`):** Extracts unique variables from formulas and keeps them sorted automatically.\n2. **Bitwise Shift Minterm Generation (`1 << N`):** Calculates powers of 2 ($2^N$) and bitwise shifts (`(i >> j) & 1`) to generate truth table input rows cleanly.\n3. **Recursive String Reduction:** Resolves nested parenthesized expressions prior to operator precedence passes.",
    "quiz": {
      "question": "How many total rows exist in a truth table for a boolean expression containing $N = 4$ distinct variables?",
      "options": [
        "`8`",
        "`16`",
        "`32`",
        "`64`"
      ],
      "answer": 1,
      "explanation": "Total truth table rows equal $2^N = 2^4 = 16$."
    },
    "fillBlank": {
      "instructions": "Complete the bitwise check extracting the binary bit at position 0:",
      "codeTemplate": "int minterm = 3; // Binary 11\nbool varB = (minterm ___1___ 1) != 0; // Bitwise AND check",
      "blanks": [
        {
          "id": 1,
          "answer": "&",
          "hint": "Bitwise AND operator"
        }
      ]
    }
  },
  {
    "id": "57-gray-code-and-karnaugh-maps",
    "category": "Capstone Applications",
    "fileSlug": "57_gray_code_and_karnaugh_maps",
    "title": "57. Gray Code & Karnaugh Map Fundamentals",
    "summary": "Understand Gray code sequences, single-bit adjacency transitions, and Karnaugh map (K-Map) reduction grids.",
    "cBridge": "Gray code conversion uses bitwise binary transformations (`binary ^ (binary >> 1)`), providing $O(1)$ conversions between standard binary and Gray code numbers.",
    "content": "\n<h3>Gray Code Sequences</h3>\n\n<p>Gray code is a binary numeral system where two successive values differ in only a single bit position. Standard binary sequences ($00, 01, 10, 11$) alter two bits when transitioning from $01$ to $10$. Gray code sequences ($00, 01, 11, 10$) enforce single-bit adjacency.</p>\n\n<h3>Binary to Gray Code Conversion</h3>\n\n<p>$$G = B \\oplus (B \\gg 1)$$</p>\n\n<p>Where $\\oplus$ represents bitwise XOR (<code>^</code>) and $\\gg$ represents right bit shift (<code>&gt;&gt;</code>).</p>\n\n<h3>Karnaugh Map (K-Map) Layout</h3>\n\n<p>K-Maps arrange boolean minterm truth cells into 2D grids using Gray code row/column headers, enabling visual boolean minimization.</p>\n",
    "starterCode": "// 29_gray_code_and_karnaugh_maps.cpp\n#include <iostream>\n\nunsigned int binaryToGray(unsigned int num) {\n    return num ^ (num >> 1);\n}\n\nint main() {\n    std::cout << \"Binary to Gray Code Sequence (0 to 3):\\n\";\n    for (unsigned int i{0}; i < 4; ++i) {\n        unsigned int g = binaryToGray(i);\n        std::cout << \"Binary: \" << i << \" -> Gray: \" << g << \"\\n\";\n    }\n\n    return 0;\n}",
    "explanation": "`binaryToGray` computes `num ^ (num >> 1)`. For $2$ (`10` in binary), $2 \\oplus (2 \\gg 1) = 2 \\oplus 1 = 3$ (`11` in Gray code), satisfying single-bit adjacency.",
    "quiz": {
      "question": "What property defines Gray code binary sequences?",
      "options": [
        "All values are prime numbers",
        "Adjacent sequence numbers differ in exactly one single bit position",
        "Values increment by 2",
        "Numbers are stored in reverse"
      ],
      "answer": 1,
      "explanation": "Gray code enforces single-bit adjacency between adjacent sequence values."
    },
    "fillBlank": {
      "instructions": "Complete the bitwise XOR operation converting binary numbers into Gray code:",
      "codeTemplate": "unsigned int bin = 2;\nunsigned int gray = bin ___1___ (bin >> 1);",
      "blanks": [
        {
          "id": 1,
          "answer": "^",
          "hint": "Bitwise XOR operator"
        }
      ]
    }
  },
  {
    "id": "58-capstone-kmap-visualiser",
    "category": "Capstone Applications",
    "fileSlug": "58_capstone_kmap_visualiser",
    "title": "58. Capstone 4: Interactive Karnaugh Map Visualiser",
    "summary": "Render interactive Karnaugh Maps (K-Maps) in the terminal with Gray code coordinate headers and visual grouping.",
    "cBridge": "This capstone combines Gray code sequencing, 2D vector grids, and ANSI color formatting to render interactive 2D Karnaugh Maps in the terminal.",
    "content": "\n<h3>Overview & Blueprint</h3>\n\n<p>The Interactive Karnaugh Map (K-Map) Visualiser bridges software boolean expression evaluation with hardware digital logic minimization. It transforms truth table outputs into 2D Karnaugh map matrices indexed by Gray code headers.</p>\n\n<p>Features:</p>\n\n<ul>\n\n  <li><strong>2, 3, and 4-Variable K-Map Support:</strong> Supports 4x4 grids representing 16 minterms ($m_0$ to $m_{15}$).</li>\n\n  <li><strong>Gray Code Matrix Layout:</strong> Row and column coordinates follow Gray code sequences (<code>00</code>, <code>01</code>, <code>11</code>, <code>10</code>) to guarantee single-bit Hamming distance adjacency.</li>\n\n  <li><strong>ANSI TrueColor Grid Formatting:</strong> High-contrast color blocks highlighting active minterm cells (<code>1</code> vs <code>0</code>).</li>\n\n</ul>\n\n<h3>Theoretical Mechanics</h3>\n\n<h3>Why Gray Code Is Required</h3>\n\n<p>In standard binary counting (<code>00, 01, 10, 11</code>), transitioning from <code>01</code> to <code>10</code> flips two bits simultaneously. In digital logic minimization, adjacent K-map cells must differ by exactly <strong>one</strong> binary variable (Hamming distance = 1). The Gray code sequence (<code>00, 01, 11, 10</code>) enforces single-bit adjacency across rows and columns.</p>\n\n<h3>4-Variable K-Map Index Mapping Matrix</h3>\n\n<p>A 4-variable K-Map (variables $A, B$ for rows and $C, D$ for columns) maps standard minterm indices ($m_0$ to $m_{15}$) into the following Gray code grid:</p>\n\n<p>| AB \\ CD | 00 | 01 | 11 | 10 |</p>\n\n<p>| :--- | :---: | :---: | :---: | :---: |</p>\n\n<p>| <strong>00</strong> | $m_0$ | $m_1$ | $m_3$ | $m_2$ |</p>\n\n<p>| <strong>01</strong> | $m_4$ | $m_5$ | $m_7$ | $m_6$ |</p>\n\n<p>| <strong>11</strong> | $m_{12}$ | $m_{13}$ | $m_{15}$ | $m_{14}$ |</p>\n\n<p>| <strong>10</strong> | $m_8$ | $m_9$ | $m_{11}$ | $m_{10}$ |</p>\n",
    "starterCode": "// 30_capstone_kmap_visualiser.cpp\n#include <iostream>\n#include <vector>\n#include <string>\n\nstd::string formatKCell(char val) {\n    if (val == '1') {\n        // Bright illuminated cell (Active minterm 1)\n        return \"\u001b[48;2;240;248;255;38;2;10;10;10;1m  1  \u001b[0m\";\n    } else if (val == '0') {\n        // Dark contrast cell (Inactive minterm 0)\n        return \"\u001b[48;2;25;30;40;38;2;140;150;165m  0  \u001b[0m\";\n    }\n    // Don't care cell (?)\n    return \"\u001b[48;2;80;85;95;38;2;240;240;240m  ?  \u001b[0m\";\n}\n\nvoid printKMap4(const std::string& truth, const std::vector<char>& vars) {\n    // 4x4 Gray code index permutation matrix\n    int map[4][4] = {\n        { 0,  1,  3,  2},\n        { 4,  5,  7,  6},\n        {12, 13, 15, 14},\n        { 8,  9, 11, 10}\n    };\n    std::string rowLabels[] = {\"00\", \"01\", \"11\", \"10\"};\n\n    std::cout << \"\n\u001b[38;2;100;220;255;1mK-Map Visualiser (\"\n              << vars[0] << vars[1] << \" \\ \" << vars[2] << vars[3] << \")\u001b[0m\n\n\";\n    std::cout << \"       \" << vars[2] << vars[3] << \": 00    01    11    10\n\";\n    std::cout << \"   \" << vars[0] << vars[1] << \" +--------------------------\n\";\n\n    for (int r = 0; r < 4; ++r) {\n        std::cout << \"    \" << rowLabels[r] << \" | \";\n        for (int c = 0; c < 4; ++c) {\n            int idx = map[r][c];\n            char bit = (idx < static_cast<int>(truth.size())) ? truth[idx] : '0';\n            std::cout << formatKCell(bit) << \" \";\n        }\n        std::cout << \"\n\";\n    }\n    std::cout << \"\n\";\n}\n\nint main() {\n    std::cout << \"\u001b[38;2;100;220;255;1m\"\n              << \"=== KARNAUGH MAP (K-MAP) VISUALISER ===\n\u001b[0m\";\n\n    // Truth vector for F = D (all odd minterm indices are 1)\n    std::string truth = \"0101010101010101\";\n    std::vector<char> vars = {'A', 'B', 'C', 'D'};\n\n    std::cout << \"Input Bitstream: \" << truth << \"\n\";\n    std::cout << \"Active Minterms: m1, m3, m5, m7, m9, m11, m13, m15\n\";\n\n    printKMap4(truth, vars);\n\n    std::cout << \"\u001b[38;2;255;215;0;1mDigital Logic Minimisation: F = D\u001b[0m\n\";\n    std::cout << \"(Columns 01 and 11 form an 8-cell octet; variables A, B, and C cancel out)\n\";\n\n    return 0;\n}",
    "explanation": "1. **Gray Code Coordinate Headers:** Renders K-maps using single-bit Hamming distance permutations (`00, 01, 11, 10`).\n2. **Minterm Mapping Array:** 2D lookup array `map[4][4]` maps truth table bit positions directly into visual K-map grid locations.\n3. **ANSI TrueColor Contrast Styling:** Applies custom background RGB codes to differentiate active minterms (`1`) from inactive cells (`0`).",
    "quiz": {
      "question": "Why are Gray code orderings (`00, 01, 11, 10`) required for K-Map row and column headers?",
      "options": [
        "To make grid sorting faster",
        "To ensure adjacent visual cells differ by exactly one binary variable",
        "To reduce memory usage",
        "To enable 64-bit precision"
      ],
      "answer": 1,
      "explanation": "Gray code headers ensure spatial visual cell adjacency corresponds to single-variable boolean differences."
    },
    "fillBlank": {
      "instructions": "Complete the 2-bit Gray code header sequence vector:",
      "codeTemplate": "#include <vector>\n#include <string>\n\nstd::vector<std::string> kmapHeaders{\"00\", \"01\", \"___1___\", \"10\"};",
      "blanks": [
        {
          "id": 1,
          "answer": "11",
          "hint": "2-bit Gray code value following 01"
        }
      ]
    }
  }
];
