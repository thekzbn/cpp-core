// lessons.js - Complete curriculum based on FreeCodeCamp C++ Course
// Extended curriculum: constants, casting, exception handling, virtual functions,
// references, string comparison, pass-by-value vs pass-by-reference, and more
// input-driven programs throughout.
// Includes beginner explanations, C-bridge notes, interactive drills, and capstone projects.

const LESSONS_DATA = [
  {
    id: "01-setup-compilation",
    category: "Foundations",
    fileSlug: "01_setup_and_basics",
    title: "1. Setup & How C++ Works",
    summary: "Understand the C++ compilation pipeline, how source code turns into an executable binary, and configure your local workspace.",
    cBridge: "In C, you used compilers like gcc to generate object files and link them. In C++, we use g++ or clang++. C++ introduces name mangling behind the scenes so that functions can be overloaded with the same name but different parameters.",
    content: "\n<h3>What is C++?</h3>\n<p>C++ is a high-performance, compiled, general-purpose programming language created by Bjarne Stroustrup in 1979 as an extension of the C programming language. It is widely used in game engines, operating systems, high-frequency financial trading systems, embedded systems, and browsers where raw execution speed and direct memory control are critical.</p>\n\n<h3>The Compilation Lifecycle</h3>\n<p>Unlike interpreted languages (like Python or JavaScript) that execute code line-by-line at runtime, C++ code must be translated into native machine instructions before running. This process involves four major phases:</p>\n\n<ol>\n  <li><strong>Preprocessing:</strong> Directives starting with <code>#</code> (such as <code>#include</code> and <code>#define</code>) are processed. Header files are copied directly into the source file.</li>\n  <li><strong>Compilation:</strong> The preprocessed code is checked for syntax and semantic correctness, then translated into assembly code.</li>\n  <li><strong>Assembly:</strong> The assembler translates assembly code into machine-readable object files (typically <code>.o</code> or <code>.obj</code>).</li>\n  <li><strong>Linking:</strong> The linker stitches your object files together with standard library routines (like input/output) into a standalone executable binary (e.g., <code>.exe</code> on Windows or an ELF binary on Linux/macOS).</li>\n</ol>\n\n<h3>Writing and Compiling from the Command Line</h3>\n<p>You can compile any C++ source file from your terminal with a single command:</p>\n<pre><code>g++ -std=c++17 -Wall main.cpp -o my_program\n./my_program</code></pre>\n",
    starterCode: "// 01_setup_and_basics.cpp\n#include <iostream>\n\nint main() {\n    std::cout << \"C++ compiler is verified and ready!\" << std::endl;\n    return 0;\n}",
    explanation: "This program tests that the compiler and iostream library are functioning correctly.",
    quiz: {
      "question": "Which component of the C++ build toolchain is responsible for joining compiled object files with library code into an executable?",
      "options": [
            "The Preprocessor",
            "The Assembler",
            "The Linker",
            "The Interpreter"
      ],
      "answer": 2,
      "explanation": "The Linker takes one or more object files created by the assembler and combines them along with library code to form the final executable file."
},
    fillBlank: {
      instructions: "Fill in the missing preprocessor directive and standard stream to complete the basic program:",
      codeTemplate: "#___1___ <iostream>\n\nint main() {\n    std::___2___ << \"Hello C++!\" << std::endl;\n    return 0;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "include",
                "hint": "Directive to import standard headers"
        },
        {
                "id": 2,
                "answer": "cout",
                "hint": "Character output stream object"
        }
]
    }
  },
  {
    id: "02-anatomy-of-a-program",
    category: "Foundations",
    fileSlug: "02_program_anatomy",
    title: "2. Anatomy of a C++ Program",
    summary: "Deconstruct the core skeleton of every C++ program: headers, namespaces, main, and console output.",
    cBridge: "In C, you included <stdio.h> and called printf(\"Hello %s\\n\", name). In C++, we include <iostream> and use the stream insertion operator: cout << \"Hello \" << name << endl;. Streams are type-safe: you never need %d or %s format specifiers.",
    content: "\n<h3>Dissecting 'Hello World'</h3>\n<p>Every C++ program shares a standardized foundation. Let's inspect the canonical starting program line-by-line:</p>\n\n<pre><code>#include &lt;iostream&gt;\nusing namespace std;\n\nint main() {\n    cout &lt;&lt; \"Hello World!\" &lt;&lt; endl;\n    return 0;\n}</code></pre>\n\n<h3>Line-by-Line Breakdown</h3>\n<ul>\n  <li><code>#include &lt;iostream&gt;</code>: Tells the preprocessor to include the Standard Input/Output Stream library. This gives access to <code>cout</code> (character output) and <code>cin</code> (character input).</li>\n  <li><code>using namespace std;</code>: The standard library lives inside a namespace called <code>std</code>. Using this directive allows writing <code>cout</code> directly instead of qualifying it as <code>std::cout</code>. While convenient in small tutorial files, professional codebases often write <code>std::cout</code> explicitly to avoid naming collisions.</li>\n  <li><code>int main() { ... }</code>: The entry point of every C++ application. When the operating system runs your binary, execution begins at the first line of <code>main</code>. The return type <code>int</code> represents the exit status code sent back to the operating system.</li>\n  <li><code>cout &lt;&lt; \"...\" &lt;&lt; endl;</code>: <code>cout</code> represents the console output stream. The <code>&lt;&lt;</code> operator is the stream insertion operator; it pushes whatever is on its right into the stream on its left. <code>endl</code> inserts a newline character and flushes the output buffer.</li>\n  <li><code>return 0;</code>: Signals to the operating system that the program concluded successfully without errors.</li>\n</ul>\n",
    starterCode: "// 02_program_anatomy.cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Welcome to C++!\" << endl;\n    cout << \"Learning step-by-step from Draft Academy FreeCodeCamp curriculum.\" << endl;\n    return 0;\n}",
    explanation: "Notice how multiple << operators can be chained sequentially into cout.",
    quiz: {
      "question": "What does the << operator do when used with cout?",
      "options": [
            "It performs a bitwise left shift on the text",
            "It acts as the stream insertion operator, feeding data into the console stream",
            "It compares if the console is less than the string",
            "It allocates memory for the printed string"
      ],
      "answer": 1,
      "explanation": "In C++, operators can be overloaded. With streams like cout, << is the stream insertion operator."
},
    fillBlank: {
      instructions: "Fill in the missing keywords to bring the standard namespace into scope and insert a line break:",
      codeTemplate: "#include <iostream>\nusing ___1___ std;\n\nint main() {\n    cout << \"First line\" << ___2___;\n    return 0;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "namespace",
                "hint": "C++ keyword used to group identifiers into scope"
        },
        {
                "id": 2,
                "answer": "endl",
                "hint": "Stream manipulator that outputs a newline and flushes"
        }
]
    }
  },
  {
    id: "03-variables-and-data-types",
    category: "Foundations",
    fileSlug: "03_variables_and_types",
    title: "3. Variables & Core Data Types",
    summary: "Master fundamental data types: integers, floating-point numbers, characters, booleans, and modern strings.",
    cBridge: "In C, working with text required char arrays (char name[50]) or char pointers, with constant worry about null terminators ('\\0') and buffer overruns. C++ gives you std::string, which automatically manages its own memory and grows dynamically.",
    content: "\n<h3>Storing Data in Memory</h3>\n<p>A variable is a named storage location in your computer's memory. Because C++ is statically typed, you must specify the type of data a variable will hold when declaring it.</p>\n\n<h3>Core Primitive Types</h3>\n<ul>\n  <li><code>char</code>: Stores a single 1-byte character surrounded by single quotes: <code>char grade = 'A';</code></li>\n  <li><code>int</code>: Stores whole numbers (positive or negative), typically 4 bytes: <code>int age = 25;</code></li>\n  <li><code>float</code>: Single-precision floating point number (approx. 7 decimal digits of precision): <code>float temp = 98.6f;</code></li>\n  <li><code>double</code>: Double-precision floating point number (approx. 15 decimal digits): <code>double pi = 3.1415926535;</code></li>\n  <li><code>bool</code>: Boolean truth value, holding either <code>true</code> or <code>false</code>: <code>bool isReady = true;</code></li>\n  <li><code>string</code>: Sequences of characters enclosed in double quotes. Requires <code>#include &lt;string&gt;</code>: <code>string name = \"Ada Lovelace\";</code></li>\n</ul>\n\n<h3>Variable Declaration and Initialization</h3>\n<pre><code>string characterName = \"John\";\nint characterAge = 35;\n\ncout &lt;&lt; \"There once was a man named \" &lt;&lt; characterName &lt;&lt; endl;\ncout &lt;&lt; \"He was \" &lt;&lt; characterAge &lt;&lt; \" years old\" &lt;&lt; endl;\n\n// You can reassign values later:\ncharacterName = \"Mike\";\ncout &lt;&lt; \"He liked the name \" &lt;&lt; characterName &lt;&lt; endl;</code></pre>\n",
    starterCode: "// 03_variables_and_types.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string characterName = \"George\";\n    int characterAge = 70;\n\n    cout << \"There once was a man named \" << characterName << endl;\n    cout << \"He was \" << characterAge << \" years old\" << endl;\n\n    characterName = \"Mike\";\n    characterAge = 25;\n\n    cout << \"He liked the name \" << characterName << endl;\n    cout << \"But did not like being \" << characterAge << endl;\n\n    return 0;\n}",
    explanation: "Variables can be reassigned during runtime as long as the new value matches the declared data type.",
    quiz: {
      "question": "Which of the following is the modern C++ type for storing multi-character text without manual buffer management?",
      "options": [
            "char*",
            "std::string",
            "char[]",
            "text"
      ],
      "answer": 1,
      "explanation": "std::string is the standard library class that manages dynamic character sequences safely and automatically."
},
    fillBlank: {
      instructions: "Declare a floating point variable and a boolean variable using appropriate C++ type keywords:",
      codeTemplate: "#include <iostream>\nusing namespace std;\n\nint main() {\n    ___1___ gpa = 3.95;\n    ___2___ isGraduated = true;\n    cout << \"GPA: \" << gpa << \" Status: \" << isGraduated << endl;\n    return 0;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "double",
                "hint": "Double precision floating point type"
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
    id: "04-working-with-strings",
    category: "Foundations",
    fileSlug: "04_working_with_strings",
    title: "4. Working with Strings",
    summary: "Learn essential string methods: length, character indexing, searching with find(), and slicing with substr().",
    cBridge: "In C, string operations required functions from <string.h> like strlen(), strstr(), and strncpy(). In C++, strings are objects with built-in member methods invoked using dot notation (phrase.length(), phrase.find()).",
    content: "\n<h3>Strings as First-Class Objects</h3>\n<p>In C++, strings are objects with properties and member functions. You don't have to count bytes or worry about null terminators manually.</p>\n\n<h3>Essential String Operations</h3>\n<ul>\n  <li><strong>Concatenation:</strong> Combine strings using the standard <code>+</code> operator:\n    <pre><code>string first = \"Hello \";\nstring second = \"World\";\nstring combined = first + second; // \"Hello World\"</code></pre>\n  </li>\n  <li><strong>Length:</strong> Get the number of characters with <code>.length()</code> or <code>.size()</code>:\n    <pre><code>string phrase = \"Giraffe Academy\";\ncout &lt;&lt; phrase.length(); // 15</code></pre>\n  </li>\n  <li><strong>Zero-based Indexing:</strong> Access or modify individual characters using bracket syntax:\n    <pre><code>phrase[0] = 'B'; // Changes \"Giraffe\" to \"Biraffe\"</code></pre>\n  </li>\n  <li><strong>Searching (<code>.find()</code>):</strong> Locate where a substring begins. Returns the index of the first character, or <code>string::npos</code> if not found:\n    <pre><code>cout &lt;&lt; phrase.find(\"Academy\", 0); // outputs 8</code></pre>\n  </li>\n  <li><strong>Extracting Substrings (<code>.substr()</code>):</strong> Extract a slice by providing <code>substr(startIndex, length)</code>:\n    <pre><code>string sub = phrase.substr(8, 7); // \"Academy\"</code></pre>\n  </li>\n</ul>\n",
    starterCode: "// 04_working_with_strings.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string phrase = \"Giraffe Academy\";\n    \n    cout << \"Original: \" << phrase << endl;\n    cout << \"Length: \" << phrase.length() << endl;\n    cout << \"Character at index 0: \" << phrase[0] << endl;\n    \n    // Search for a word\n    int idx = phrase.find(\"Academy\", 0);\n    cout << \"'Academy' starts at index: \" << idx << endl;\n    \n    // Extract substring: substr(start, length)\n    string sub = phrase.substr(idx, 7);\n    cout << \"Extracted substring: \" << sub << endl;\n\n    return 0;\n}",
    explanation: "Notice that substr(start, count) takes the starting index and how many characters to take, not the ending index.",
    quiz: {
      "question": "If string s = \"Computer\"; what does s.substr(3, 4) return?",
      "options": [
            "\"put\"",
            "\"pute\"",
            "\"comp\"",
            "\"puter\""
      ],
      "answer": 1,
      "explanation": "Index 3 is 'p' (0:C, 1:o, 2:m, 3:p). Taking 4 characters yields 'p', 'u', 't', 'e' -> \"pute\"."
},
    fillBlank: {
      instructions: "Fill in the string methods to query length and extract a 4-character slice starting at index 0:",
      codeTemplate: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string lang = \"CPlusPlus\";\n    int len = lang.___1___();\n    string prefix = lang.___2___(0, 5);\n    cout << \"Len: \" << len << \" Prefix: \" << prefix << endl;\n    return 0;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "length",
                "hint": "Member method returning string character count"
        },
        {
                "id": 2,
                "answer": "substr",
                "hint": "Member method to extract a sub-slice"
        }
]
    }
  },
  {
    id: "05-numbers-and-math",
    category: "Foundations",
    fileSlug: "05_numbers_and_math",
    title: "5. Numbers & Math Operations",
    summary: "Explore integer division, precedence, type conversion, and common mathematical functions in <cmath>.",
    cBridge: "Just like in C, integer division in C++ truncates the fractional part (10 / 3 evaluates to 3, not 3.333). To keep decimals, at least one operand must be a float or double, or you can use static_cast<double>(a) / b.",
    content: "\n<h3>Arithmetic Operators</h3>\n<p>C++ supports standard mathematical operators: <code>+</code> (addition), <code>-</code> (subtraction), <code>*</code> (multiplication), <code>/</code> (division), and <code>%</code> (modulo / remainder).</p>\n\n<h3>The Integer Division Trap</h3>\n<p>When you divide two integers in C++, the compiler performs <strong>integer division</strong>, throwing away any fractional remainder:</p>\n<pre><code>cout &lt;&lt; 10 / 3;    // Outputs: 3\ncout &lt;&lt; 10.0 / 3;  // Outputs: 3.33333\ncout &lt;&lt; 10 / 3.0;  // Outputs: 3.33333</code></pre>\n\n<h3>The <code>&lt;cmath&gt;</code> Library</h3>\n<p>Include <code>#include &lt;cmath&gt;</code> to access standard mathematical helper functions:</p>\n<ul>\n  <li><code>pow(base, exponent)</code>: Computes power (e.g. <code>pow(2, 5)</code> gives 32).</li>\n  <li><code>sqrt(x)</code>: Computes the square root (e.g. <code>sqrt(36)</code> gives 6).</li>\n  <li><code>round(x)</code>: Rounds to the nearest whole integer.</li>\n  <li><code>ceil(x)</code>: Always rounds up to the next integer.</li>\n  <li><code>floor(x)</code>: Always rounds down to the prior integer.</li>\n  <li><code>fmax(a, b)</code> and <code>fmin(a, b)</code>: Returns the larger or smaller of two numbers.</li>\n</ul>\n",
    starterCode: "// 05_numbers_and_math.cpp\n#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    cout << \"5 + 7 = \" << 5 + 7 << endl;\n    cout << \"10 / 3 = \" << 10 / 3 << \" (integer division)\" << endl;\n    cout << \"10.0 / 3 = \" << 10.0 / 3 << \" (float division)\" << endl;\n    cout << \"10 % 3 = \" << 10 % 3 << \" (remainder)\" << endl;\n    \n    cout << \"2^3 = \" << pow(2, 3) << endl;\n    cout << \"sqrt(64) = \" << sqrt(64) << endl;\n    cout << \"round(4.3) = \" << round(4.3) << endl;\n    cout << \"ceil(4.1) = \" << ceil(4.1) << endl;\n    cout << \"fmax(3, 10) = \" << fmax(3, 10) << endl;\n\n    return 0;\n}",
    explanation: "Math operations obey standard operator precedence (PEMDAS). Use parentheses to dictate exact evaluation order.",
    quiz: {
      "question": "What is the result of evaluated expression: 7 / 2 in C++?",
      "options": [
            "3.5",
            "3",
            "4",
            "3.0"
      ],
      "answer": 1,
      "explanation": "Because both 7 and 2 are integers, integer division truncates the decimal remainder, producing 3."
},
    fillBlank: {
      instructions: "Fill in the header and function to compute 3 raised to the power of 4:",
      codeTemplate: "#include <iostream>\n#include <___1___>\nusing namespace std;\n\nint main() {\n    cout << \"3^4 = \" << ___2___(3, 4) << endl;\n    return 0;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "cmath",
                "hint": "Standard C++ mathematics header"
        },
        {
                "id": 2,
                "answer": "pow",
                "hint": "Function that raises base to power"
        }
]
    }
  },
  {
    id: "06-getting-user-input",
    category: "Foundations",
    fileSlug: "06_user_input",
    title: "6. Getting User Input (cin & getline)",
    summary: "Capture interactive user input from the console with cin and handle full lines containing spaces using getline().",
    cBridge: "In C, user input used scanf(\"%d\", &age), which required passing memory addresses and often left unread characters in stdin. In C++, cin >> age reads numbers automatically without addresses. For strings with spaces, getline(cin, str) replaces gets() or fgets().",
    content: "\n<h3>Reading Primitive Values with <code>cin</code></h3>\n<p>To capture input typed by the user into the terminal, we use <code>cin</code> (character input) combined with the stream extraction operator <code>&gt;&gt;</code>:</p>\n\n<pre><code>int age;\ncout &lt;&lt; \"Enter your age: \";\ncin &gt;&gt; age;\ncout &lt;&lt; \"You are \" &lt;&lt; age &lt;&lt; \" years old.\" &lt;&lt; endl;</code></pre>\n\n<h3>Reading Full Lines with <code>getline()</code></h3>\n<p>If you try to read a string like <code>\"Ada Lovelace\"</code> using <code>cin &gt;&gt; name</code>, it will only capture <code>\"Ada\"</code> because it stops at the space. To capture a full line including spaces, use <code>getline()</code>:</p>\n\n<pre><code>string fullName;\ncout &lt;&lt; \"Enter your full name: \";\ngetline(cin, fullName);\ncout &lt;&lt; \"Hello \" &lt;&lt; fullName &lt;&lt; endl;</code></pre>\n\n<h3>The <code>cin.ignore()</code> Rule</h3>\n<p>If you read a number with <code>cin &gt;&gt; age;</code> and then immediately try to call <code>getline(cin, fullName);</code>, the <code>getline()</code> will read the leftover newline character from when the user hit Enter after typing their age. To clear this newline, call <code>cin.ignore();</code>.</p>\n",
    starterCode: "// 06_user_input.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int age;\n    string name;\n\n    cout << \"Enter your age: \";\n    cin >> age;\n    \n    // Clear newline buffer before calling getline\n    cin.ignore();\n\n    cout << \"Enter your full name: \";\n    getline(cin, name);\n\n    cout << \"Welcome, \" << name << \"! You are \" << age << \" years old.\" << endl;\n    return 0;\n}",
    explanation: "Try typing input into the program input box before running this code.",
    quiz: {
      "question": "Why does cin >> name only store the first word if the user types 'John Doe'?",
      "options": [
            "cin has a 4-character limit",
            "The >> operator stops reading when it hits whitespace (space, tab, newline)",
            "Strings cannot store spaces in C++",
            "It is a compiler error"
      ],
      "answer": 1,
      "explanation": "cin >> separates tokens by whitespace. To capture lines with spaces, use getline(cin, name)."
},
    fillBlank: {
      instructions: "Fill in the operator and function to read an integer and a line of text:",
      codeTemplate: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int id;\n    string title;\n    cin ___1___ id;\n    cin.ignore();\n    ___2___(cin, title);\n    return 0;\n}",
      blanks: [
        {
                "id": 1,
                "answer": ">>",
                "hint": "Stream extraction operator"
        },
        {
                "id": 2,
                "answer": "getline",
                "hint": "Function to read full line from stream"
        }
]
    }
  },
  {
    id: "07-mini-projects-calculator-madlibs",
    category: "Control Flow & Projects",
    fileSlug: "07_calculator_and_madlibs",
    title: "7. Building Mini Projects: Calculator & Mad Libs",
    summary: "Put input, output, strings, and math together to build a functional addition calculator and a Mad Libs word game.",
    cBridge: "In C, string formatting games required sprintf() into fixed-length arrays. In C++, dynamic string concatenation makes building interactive text-based console games clean and memory-safe.",
    content: "\n<h3>Project 1: Basic Calculator</h3>\n<p>Prompt the user for two decimal numbers, read them with <code>cin</code>, add them together, and display the sum:</p>\n\n<pre><code>double num1, num2;\ncout &lt;&lt; \"Enter first number: \";\ncin &gt;&gt; num1;\ncout &lt;&lt; \"Enter second number: \";\ncin &gt;&gt; num2;\n\ncout &lt;&lt; \"Result: \" &lt;&lt; (num1 + num2) &lt;&lt; endl;</code></pre>\n\n<h3>Project 2: Mad Libs Game</h3>\n<p>Mad Libs asks the player for a series of words (colors, plural nouns, celebrities) without showing them the story. Once all inputs are gathered, the program prints the completed poem:</p>\n\n<pre><code>// Roses are {color}\n// {pluralNoun} are blue\n// I love {celebrity}</code></pre>\n",
    starterCode: "// 07_calculator_and_madlibs.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string color = \"red\";\n    string pluralNoun = \"violets\";\n    string celebrity = \"Dennis Ritchie\";\n\n    cout << \"--- Your Mad Libs Poem ---\" << endl;\n    cout << \"Roses are \" << color << endl;\n    cout << pluralNoun << \" are blue\" << endl;\n    cout << \"I love \" << celebrity << endl;\n\n    double num1 = 15.5;\n    double num2 = 4.5;\n    cout << endl << \"Calculator: \" << num1 << \" + \" << num2 << \" = \" << (num1 + num2) << endl;\n\n    return 0;\n}",
    explanation: "This exercise solidifies reading strings with spaces and formatting console output cleanly.",
    quiz: {
      "question": "If we want our calculator to handle numbers with decimal points (like 4.5 + 3.2), which data type should the variables be?",
      "options": [
            "int",
            "char",
            "double",
            "string"
      ],
      "answer": 2,
      "explanation": "double represents double-precision 64-bit floating point numbers, preserving fractional values."
},
    fillBlank: {
      instructions: "Fill in the missing types and stream operators to compute the product of two user-provided numbers:",
      codeTemplate: "#include <iostream>\nusing namespace std;\n\nint main() {\n    ___1___ a, b;\n    cin >> a >> b;\n    cout ___2___ \"Product: \" << (a * b) << endl;\n    return 0;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "double",
                "hint": "Floating point type for decimal numbers"
        },
        {
                "id": 2,
                "answer": "<<",
                "hint": "Stream insertion operator for cout"
        }
]
    }
  },
  {
    id: "08-arrays",
    category: "Control Flow & Projects",
    fileSlug: "08_arrays",
    title: "8. Arrays (Fixed Size Containers)",
    summary: "Store and access ordered collections of elements in contiguous memory using C++ fixed-size arrays.",
    cBridge: "Raw arrays in C++ have identical memory layout to C arrays: contiguous elements with zero bounds checking. Modern C++ also introduces std::vector and std::array, but understanding raw arrays is fundamental.",
    content: "\n<h3>What is an Array?</h3>\n<p>An array is a data structure that holds a fixed number of values of the same type in sequential memory locations.</p>\n\n<h3>Declaring and Initializing Arrays</h3>\n<pre><code>// Declare and initialize with values:\nint luckyNums[] = {4, 8, 15, 16, 23, 42};\n\n// Declare with a fixed size to populate later:\nint scores[5];\nscores[0] = 95;\nscores[1] = 88;</code></pre>\n\n<h3>Indexing and Bounds</h3>\n<p>Arrays are 0-indexed. An array of 6 elements has indices <code>0</code> through <code>5</code>. Accessing an element outside these bounds (e.g. <code>luckyNums[10]</code>) leads to undefined behavior because raw C++ arrays do not check boundary limits automatically.</p>\n",
    starterCode: "// 08_arrays.cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int luckyNums[6] = {4, 8, 15, 16, 23, 42};\n    \n    cout << \"Original index 0: \" << luckyNums[0] << endl;\n    \n    luckyNums[0] = 100;\n    cout << \"Modified index 0: \" << luckyNums[0] << endl;\n    cout << \"Index 4: \" << luckyNums[4] << endl;\n\n    return 0;\n}",
    explanation: "Accessing and mutating elements by index is an O(1) constant time operation.",
    quiz: {
      "question": "If int arr[5] = {10, 20, 30, 40, 50}; what is arr[2]?",
      "options": [
            "10",
            "20",
            "30",
            "40"
      ],
      "answer": 2,
      "explanation": "Because indexing starts at 0: arr[0] is 10, arr[1] is 20, and arr[2] is 30."
},
    fillBlank: {
      instructions: "Declare an array of 3 integers and access its last element:",
      codeTemplate: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int primes[___1___] = {2, 3, 5};\n    cout << \"Last prime: \" << primes[___2___] << endl;\n    return 0;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "3",
                "hint": "Total number of elements allocated"
        },
        {
                "id": 2,
                "answer": "2",
                "hint": "Zero-based index of the 3rd element"
        }
]
    }
  },
  {
    id: "09-functions",
    category: "Control Flow & Projects",
    fileSlug: "09_functions_and_returns",
    title: "9. Functions & Return Values",
    summary: "Organize reusable blocks of code, pass arguments, return values, and use function declarations.",
    cBridge: "In C, parameters were passed strictly by value or by raw pointers (void swap(int *a, int *b)). C++ introduces pass-by-reference (void swap(int &a, int &b)), giving you clean syntax with direct in-place mutation without pointer dereferencing.",
    content: "\n<h3>Creating Functions</h3>\n<p>A function is a named block of code designed to perform a specific task. Defining functions makes code reusable, readable, and testable.</p>\n\n<pre><code>void sayHi(string name, int age) {\n    cout &lt;&lt; \"Hello \" &lt;&lt; name &lt;&lt; \", you are \" &lt;&lt; age &lt;&lt; endl;\n}</code></pre>\n\n<h3>Returning Values</h3>\n<p>If a function computes a result, its return type must match the type of the value returned via the <code>return</code> keyword:</p>\n<pre><code>double cube(double num) {\n    double result = num * num * num;\n    return result;\n}</code></pre>\n\n<h3>Function Prototypes (Declarations)</h3>\n<p>In C++, the compiler reads files from top to bottom. If you call a function before its definition appears, you must declare its <strong>prototype</strong> above <code>main()</code>:</p>\n<pre><code>double cube(double num); // Prototype</code></pre>\n",
    starterCode: "// 09_functions_and_returns.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\ndouble cube(double num);\nvoid greet(string user);\n\nint main() {\n    greet(\"Doe\");\n    double answer = cube(5.0);\n    cout << \"5 cubed is: \" << answer << endl;\n    return 0;\n}\n\nvoid greet(string user) {\n    cout << \"Welcome, \" << user << \"!\" << endl;\n}\n\ndouble cube(double num) {\n    return num * num * num;\n}",
    explanation: "Notice the difference between void (does not return a value) and typed functions like double cube().",
    quiz: {
      "question": "What happens if you define a function below main() without writing a prototype above main()?",
      "options": [
            "It compiles and runs normally",
            "The compiler throws an error stating the identifier was not declared in this scope",
            "The function executes in parallel",
            "It returns 0 automatically"
      ],
      "answer": 1,
      "explanation": "C++ requires identifiers to be declared before they are called. A prototype informs the compiler of the function's signature."
},
    fillBlank: {
      instructions: "Complete the function signature that takes two integers and returns their sum:",
      codeTemplate: "___1___ addNumbers(int a, int b) {\n    ___2___ a + b;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "int",
                "hint": "Return type of the function"
        },
        {
                "id": 2,
                "answer": "return",
                "hint": "Keyword that passes result back to caller"
        }
]
    }
  },
  {
    id: "10-if-statements",
    category: "Control Flow & Projects",
    fileSlug: "10_if_statements",
    title: "10. If Statements & Logical Operators",
    summary: "Make decisions in your code using conditional branching, boolean evaluation, and logical operators.",
    cBridge: "In original C (C89), there was no native bool type (integers 0 and non-zero were used). C++ has a first-class bool type with true and false literals, along with relational and short-circuit logical operators (&&, ||, !).",
    content: "\n<h3>Conditional Branching</h3>\n<p>If statements allow your program to execute different blocks of code depending on whether a given condition evaluates to <code>true</code> or <code>false</code>.</p>\n\n<pre><code>bool isMale = true;\nbool isTall = false;\n\nif (isMale && isTall) {\n    cout &lt;&lt; \"You are a tall male\" &lt;&lt; endl;\n} else if (isMale && !isTall) {\n    cout &lt;&lt; \"You are a short male\" &lt;&lt; endl;\n} else if (!isMale && isTall) {\n    cout &lt;&lt; \"You are tall but not male\" &lt;&lt; endl;\n} else {\n    cout &lt;&lt; \"You are neither male nor tall\" &lt;&lt; endl;\n}</code></pre>\n\n<h3>Logical and Relational Operators</h3>\n<ul>\n  <li><code>&amp;&amp;</code> (AND): True only if both conditions are true.</li>\n  <li><code>||</code> (OR): True if at least one condition is true.</li>\n  <li><code>!</code> (NOT): Negates a boolean expression.</li>\n  <li><code>==</code> (equal to), <code>!=</code> (not equal to).</li>\n  <li><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code> (numeric comparisons).</li>\n</ul>\n",
    starterCode: "// 10_if_statements.cpp\n#include <iostream>\nusing namespace std;\n\nint getMax(int num1, int num2, int num3) {\n    int result;\n    if (num1 >= num2 && num1 >= num3) {\n        result = num1;\n    } else if (num2 >= num1 && num2 >= num3) {\n        result = num2;\n    } else {\n        result = num3;\n    }\n    return result;\n}\n\nint main() {\n    cout << \"Max of (4, 10, 2): \" << getMax(4, 10, 2) << endl;\n    cout << \"Max of (15, 3, 9): \" << getMax(15, 3, 9) << endl;\n    return 0;\n}",
    explanation: "Notice the logical AND (&&) ensuring both boundary conditions hold true.",
    quiz: {
      "question": "What does the expression (true && !false) evaluate to?",
      "options": [
            "false",
            "true",
            "0",
            "undefined"
      ],
      "answer": 1,
      "explanation": "!false is true. true && true evaluates to true."
},
    fillBlank: {
      instructions: "Fill in the logical operators for AND and NOT:",
      codeTemplate: "if (hasKey ___1___ ___2___isDoorLocked) {\n    cout << \"Enter room\" << endl;\n}",
      blanks: [
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
    id: "11-switch-statements",
    category: "Control Flow & Projects",
    fileSlug: "11_switch_statements",
    title: "11. Switch Statements",
    summary: "Simplify multi-way branching against integer and character constants using switch and case blocks.",
    cBridge: "Switch statements in C++ follow the identical syntax and fall-through semantics as C. Remember to always include break to prevent unintentional fall-through to subsequent cases.",
    content: "\n<h3>When to Use <code>switch</code></h3>\n<p>When you need to compare a single variable against many discrete integer or character constant values, a <code>switch</code> statement is cleaner and often faster than chained <code>if-else if</code> statements.</p>\n\n<pre><code>string getDayOfWeek(int dayNum) {\n    string dayName;\n    switch (dayNum) {\n        case 0:\n            dayName = \"Sunday\";\n            break;\n        case 1:\n            dayName = \"Monday\";\n            break;\n        default:\n            dayName = \"Invalid Day Number\";\n    }\n    return dayName;\n}</code></pre>\n",
    starterCode: "// 11_switch_statements.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nstring getDayOfWeek(int dayNum) {\n    switch (dayNum) {\n        case 0: return \"Sunday\";\n        case 1: return \"Monday\";\n        case 2: return \"Tuesday\";\n        case 3: return \"Wednesday\";\n        case 4: return \"Thursday\";\n        case 5: return \"Friday\";\n        case 6: return \"Saturday\";\n        default: return \"Invalid day number\";\n    }\n}\n\nint main() {\n    cout << \"Day 2 is: \" << getDayOfWeek(2) << endl;\n    cout << \"Day 5 is: \" << getDayOfWeek(5) << endl;\n    cout << \"Day 9 is: \" << getDayOfWeek(9) << endl;\n    return 0;\n}",
    explanation: "Because return immediately exits the function, explicit break statements are not strictly required when returning directly.",
    quiz: {
      "question": "What happens if you omit the break statement in a case block?",
      "options": [
            "The compiler throws a syntax error",
            "Execution continues into the next case block (fall-through)",
            "The program immediately halts",
            "The default block executes automatically"
      ],
      "answer": 1,
      "explanation": "Without a break, execution falls through to the next case statements."
},
    fillBlank: {
      instructions: "Fill in the keywords to start a case branch and stop fall-through:",
      codeTemplate: "switch (op) {\n    ___1___ '+':\n        cout << a + b;\n        ___2___;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "case",
                "hint": "Keyword matching a constant value"
        },
        {
                "id": 2,
                "answer": "break",
                "hint": "Statement that prevents fall-through"
        }
]
    }
  },
  {
    id: "12-loops-while-for",
    category: "Control Flow & Projects",
    fileSlug: "12_loops",
    title: "12. Loops: While, Do-While & For",
    summary: "Automate repetitive execution using while loops, post-test do-while loops, and indexed for loops.",
    cBridge: "Loops operate identically to C. In addition to traditional index-based for loops, modern C++ (C++11 and newer) introduces range-based for loops: for (int x : array), which simplifies container traversal.",
    content: "\n<h3>While Loops</h3>\n<p>A <code>while</code> loop repeatedly executes its body as long as its condition remains <code>true</code>:</p>\n<pre><code>int index = 1;\nwhile (index &lt;= 5) {\n    cout &lt;&lt; index &lt;&lt; endl;\n    index++;\n}</code></pre>\n\n<h3>Do-While Loops</h3>\n<p>A <code>do-while</code> loop evaluates its condition <em>after</em> executing the body, guaranteeing the body executes at least once.</p>\n\n<h3>For Loops</h3>\n<p>A <code>for</code> loop consolidates initialization, condition checking, and step incrementing into a single line:</p>\n<pre><code>for (int i = 1; i &lt;= 5; i++) {\n    cout &lt;&lt; i &lt;&lt; endl;\n}</code></pre>\n",
    starterCode: "// 12_loops.cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"--- While Loop ---\" << endl;\n    int w = 1;\n    while (w <= 3) {\n        cout << \"w = \" << w << endl;\n        w++;\n    }\n\n    cout << endl << \"--- For Loop ---\" << endl;\n    int nums[] = {10, 20, 30, 40, 50};\n    for (int i = 0; i < 5; i++) {\n        cout << \"nums[\" << i << \"] = \" << nums[i] << endl;\n    }\n\n    return 0;\n}",
    explanation: "For loops are ideal when the number of iterations is known before loop entry.",
    quiz: {
      "question": "What is the primary difference between a while loop and a do-while loop?",
      "options": [
            "A while loop cannot use integer counters",
            "A do-while loop is guaranteed to execute its body at least once",
            "A do-while loop runs faster in machine code",
            "A while loop has no condition"
      ],
      "answer": 1,
      "explanation": "A do-while loop evaluates its condition at the bottom of the loop body, guaranteeing at least one execution."
},
    fillBlank: {
      instructions: "Fill in the loop syntax to iterate from 0 to 4:",
      codeTemplate: "___1___ (int i = 0; i < 5; i___2___) {\n    cout << i << endl;\n}",
      blanks: [
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
    id: "13-guessing-game-project",
    category: "Control Flow & Projects",
    fileSlug: "13_guessing_game",
    title: "13. Building an Interactive Guessing Game",
    summary: "Synthesize loops, conditionals, and state tracking to build a full terminal guessing game with attempt limits.",
    cBridge: "Tracking state with boolean flags (bool outOfGuesses) in C++ replaces old C patterns using integer flags (0 or 1), making code intent clearer.",
    content: "\n<h3>Designing the Game Loop</h3>\n<p>In this project from the course, we construct a game where the user must guess a secret number. The user is allowed a maximum of 3 guesses.</p>\n\n<h3>The Game Loop Logic</h3>\n<pre><code>while (secretNum != guess &amp;&amp; !outOfGuesses) {\n    if (guessCount &lt; guessLimit) {\n        cout &lt;&lt; \"Enter guess: \";\n        cin &gt;&gt; guess;\n        guessCount++;\n    } else {\n        outOfGuesses = true;\n    }\n}\n\nif (outOfGuesses) {\n    cout &lt;&lt; \"You lose! Out of guesses.\" &lt;&lt; endl;\n} else {\n    cout &lt;&lt; \"You win!\" &lt;&lt; endl;\n}</code></pre>\n",
    starterCode: "// 13_guessing_game.cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int secretNum = 7;\n    int guess = 0;\n    int guessCount = 0;\n    int guessLimit = 3;\n    bool outOfGuesses = false;\n\n    cout << \"Welcome to the Guessing Game! You have 3 tries.\" << endl;\n\n    int sampleGuesses[3] = {2, 5, 7};\n    int simulatedInputIndex = 0;\n\n    while (secretNum != guess && !outOfGuesses) {\n        if (guessCount < guessLimit) {\n            guess = sampleGuesses[simulatedInputIndex++];\n            cout << \"Guessed: \" << guess << endl;\n            guessCount++;\n        } else {\n            outOfGuesses = true;\n        }\n    }\n\n    if (outOfGuesses) {\n        cout << \"Out of guesses! You Lose!\" << endl;\n    } else {\n        cout << \"Congratulations, You Win!\" << endl;\n    }\n\n    return 0;\n}",
    explanation: "The loop terminates either when the secret is discovered OR when outOfGuesses becomes true.",
    quiz: {
      "question": "Which loop condition ensures the game stops if the player guesses correctly OR runs out of tries?",
      "options": [
            "while (secretNum == guess || outOfGuesses)",
            "while (secretNum != guess && !outOfGuesses)",
            "while (guessCount == guessLimit)",
            "while (true)"
      ],
      "answer": 1,
      "explanation": "The loop must keep running while the guess is NOT correct AND the player is NOT out of guesses."
},
    fillBlank: {
      instructions: "Fill in the condition so the loop runs only while guess is incorrect and attempts remain:",
      codeTemplate: "while (secretNum != guess ___1___ ___2___outOfGuesses) {\n    // loop body\n}",
      blanks: [
        {
                "id": 1,
                "answer": "&&",
                "hint": "Logical AND"
        },
        {
                "id": 2,
                "answer": "!",
                "hint": "Logical NOT"
        }
]
    }
  },
  {
    id: "14-2d-arrays-nested-loops",
    category: "Control Flow & Projects",
    fileSlug: "14_2d_arrays_nested_loops",
    title: "14. 2D Arrays & Nested Loops",
    summary: "Work with multi-dimensional matrices and learn how nested loops traverse grid data row-by-row.",
    cBridge: "2D arrays in C++ are stored in row-major order in memory, identical to C. Modern C++ often uses std::vector<std::vector<int>> for dynamic grids, but nested index loops remain the standard traversal paradigm.",
    content: "\n<h3>Multi-Dimensional Arrays</h3>\n<p>A 2D array is an array of arrays, useful for representing grids, tables, boards, and matrices.</p>\n\n<pre><code>// 3 rows, 2 columns:\nint numberGrid[3][2] = {\n    {1, 2},\n    {3, 4},\n    {5, 6}\n};\n\ncout &lt;&lt; numberGrid[0][1]; // Row 0, Col 1 -> 2\ncout &lt;&lt; numberGrid[2][0]; // Row 2, Col 0 -> 5</code></pre>\n",
    starterCode: "// 14_2d_arrays_nested_loops.cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int grid[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n\n    cout << \"Traversing 3x3 Grid:\" << endl;\n    for (int row = 0; row < 3; row++) {\n        for (int col = 0; col < 3; col++) {\n            cout << grid[row][col] << \"\t\";\n        }\n        cout << endl;\n    }\n\n    return 0;\n}",
    explanation: "Row-major iteration matches how bytes are laid out sequentially in RAM, ensuring cache efficiency.",
    quiz: {
      "question": "In int grid[4][5]; how many total integers are stored in memory?",
      "options": [
            "9",
            "20",
            "25",
            "16"
      ],
      "answer": 1,
      "explanation": "4 rows * 5 columns = 20 total elements."
},
    fillBlank: {
      instructions: "Declare a 2D integer array with 2 rows and 3 columns:",
      codeTemplate: "int matrix[___1___][___2___] = { {1,2,3}, {4,5,6} };",
      blanks: [
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
    id: "15-pointers-and-memory",
    category: "Memory Architecture",
    fileSlug: "15_pointers_and_memory",
    title: "15. Pointers & Memory Addresses",
    summary: "Demystify physical RAM addresses, pointer types, the address-of operator (&), and dereferencing (*).",
    cBridge: "C and C++ share identical raw pointer mechanics (& to get an address, * to dereference). However, C++ introduces two critical upgrades: references (int &ref = x), which act as non-null aliases, and smart pointers (std::unique_ptr, std::shared_ptr), which automatically free memory via RAII.",
    content: "\n<h3>What is a Memory Address?</h3>\n<p>When your program runs, every variable resides at a specific hexadecimal address in computer memory (RAM). You can inspect any variable's memory address using the <strong>address-of operator</strong> (<code>&amp;</code>):</p>\n\n<pre><code>int age = 19;\ncout &lt;&lt; &amp;age; // Prints something like 0x7ffd5e2a</code></pre>\n\n<h3>What is a Pointer?</h3>\n<p>A <strong>pointer</strong> is simply a variable that stores the memory address of another variable. We declare a pointer with an asterisk (<code>*</code>):</p>\n\n<pre><code>int age = 19;\nint* pAge = &amp;age; // pAge now holds the address of age</code></pre>\n\n<h3>Dereferencing a Pointer</h3>\n<p>Dereferencing means inspecting or modifying the actual value stored at the address pointed to by the pointer. We use the <code>*</code> operator on an existing pointer:</p>\n\n<pre><code>cout &lt;&lt; *pAge;  // Dereferences: prints 19\n*pAge = 25;     // Directly changes the value stored in 'age'\ncout &lt;&lt; age;    // Now prints 25!</code></pre>\n",
    starterCode: "// 15_pointers_and_memory.cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 19;\n    double gpa = 3.8;\n    \n    int* pAge = &age;\n    double* pGpa = &gpa;\n\n    cout << \"Variable 'age' value: \" << age << endl;\n    cout << \"Address of 'age' (&age): \" << pAge << endl;\n    cout << \"Dereferenced pointer (*pAge): \" << *pAge << endl;\n\n    *pAge = 21;\n    cout << \"New 'age' value after *pAge = 21: \" << age << endl;\n\n    // C++ Reference demonstration\n    int& ageRef = age;\n    ageRef = 30;\n    cout << \"New 'age' value after ageRef = 30: \" << age << endl;\n\n    return 0;\n}",
    explanation: "Notice how * serves two purposes: in declarations (int* p) it declares a pointer; on expressions (*p) it dereferences.",
    quiz: {
      "question": "If int x = 42; int* p = &x; what does *p evaluate to?",
      "options": [
            "The hexadecimal address of x",
            "42",
            "The address of p",
            "null"
      ],
      "answer": 1,
      "explanation": "Dereferencing *p fetches the value stored at the address held in p, which is 42."
},
    fillBlank: {
      instructions: "Store the address of num in a pointer and dereference it to read the value:",
      codeTemplate: "int num = 100;\nint* ptr = ___1___num;\ncout << ___2___ptr << endl;",
      blanks: [
        {
                "id": 1,
                "answer": "&",
                "hint": "Address-of operator"
        },
        {
                "id": 2,
                "answer": "*",
                "hint": "Dereference operator"
        }
]
    }
  },
  {
    id: "16-classes-and-objects",
    category: "Object-Oriented C++",
    fileSlug: "16_classes_and_objects",
    title: "16. Classes & Objects",
    summary: "Transition from procedural to object-oriented programming. Create custom data models with attributes and instances.",
    cBridge: "In C, you defined data structures using typedef struct { ... } Book;. In C++, a class is a full object blueprint that can contain both data attributes and member functions, with public/private encapsulation.",
    content: "\n<h3>Why Object-Oriented Programming?</h3>\n<p>Primitive types (<code>int</code>, <code>string</code>, <code>double</code>) are not enough to model complex real-world entities like a Book, User, Bank Account, or Game Character. A <strong>class</strong> allows you to create a custom data type that packages related attributes and behaviors together.</p>\n\n<h3>Class vs Object</h3>\n<ul>\n  <li><strong>Class:</strong> The blueprint or schematic (e.g., the architectural plan of a house).</li>\n  <li><strong>Object:</strong> The concrete instance built in memory according to that blueprint.</li>\n</ul>\n\n<h3>Defining a Class</h3>\n<pre><code>class Book {\n    public:\n        string title;\n        string author;\n        int pages;\n};</code></pre>\n",
    starterCode: "// 16_classes_and_objects.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Book {\n    public:\n        string title;\n        string author;\n        int pages;\n};\n\nint main() {\n    Book book1;\n    book1.title = \"Harry Potter\";\n    book1.author = \"JK Rowling\";\n    book1.pages = 500;\n\n    Book book2;\n    book2.title = \"Lord of the Rings\";\n    book2.author = \"Tolkein\";\n    book2.pages = 700;\n\n    cout << book1.title << \" has \" << book1.pages << \" pages.\" << endl;\n    cout << book2.title << \" has \" << book2.pages << \" pages.\" << endl;\n\n    return 0;\n}",
    explanation: "Each object (book1 and book2) has its own independent copy of the title, author, and pages attributes in memory.",
    quiz: {
      "question": "By default, what is the access specifier for members inside a C++ class if not explicitly stated?",
      "options": [
            "public",
            "private",
            "protected",
            "global"
      ],
      "answer": 1,
      "explanation": "In C++, class members default to private. In a struct, members default to public."
},
    fillBlank: {
      instructions: "Declare a class Car with public speed attribute:",
      codeTemplate: "___1___ Car {\n    ___2___:\n        int speed;\n};",
      blanks: [
        {
                "id": 1,
                "answer": "class",
                "hint": "C++ keyword to define a class"
        },
        {
                "id": 2,
                "answer": "public",
                "hint": "Access specifier making members visible outside"
        }
]
    }
  },
  {
    id: "17-constructors",
    category: "Object-Oriented C++",
    fileSlug: "17_constructors",
    title: "17. Constructors",
    summary: "Automate object initialization when instances are created and support multiple creation patterns with overloading.",
    cBridge: "In C, initializing a struct required writing helper functions like create_book() or manual memset(). In C++, constructors run automatically whenever an object is instantiated, preventing uninitialized memory bugs.",
    content: "\n<h3>What is a Constructor?</h3>\n<p>A constructor is a special member function that is automatically executed whenever an object of that class is instantiated. It always shares the exact same name as the class and has <strong>no return type</strong>.</p>\n\n<pre><code>class Book {\n    public:\n        string title;\n        string author;\n        int pages;\n\n        // Constructor\n        Book(string aTitle, string aAuthor, int aPages) {\n            title = aTitle;\n            author = aAuthor;\n            pages = aPages;\n        }\n};</code></pre>\n",
    starterCode: "// 17_constructors.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Book {\n    public:\n        string title;\n        string author;\n        int pages;\n\n        Book(string aTitle, string aAuthor, int aPages) {\n            title = aTitle;\n            author = aAuthor;\n            pages = aPages;\n            cout << \"Initialized book: \" << title << endl;\n        }\n\n        Book() {\n            title = \"Untitled\";\n            author = \"Anonymous\";\n            pages = 0;\n        }\n};\n\nint main() {\n    Book book1(\"Harry Potter\", \"JK Rowling\", 500);\n    Book book2(\"1984\", \"George Orwell\", 328);\n    Book emptyBook;\n\n    cout << emptyBook.title << \" (\" << emptyBook.pages << \" pages)\" << endl;\n    return 0;\n}",
    explanation: "Constructors guarantee an object begins its lifetime in a valid, well-defined state.",
    quiz: {
      "question": "Which of the following is true about C++ constructors?",
      "options": [
            "They must return an integer status code",
            "They share the exact name of the class and have no return type",
            "They can only be called manually via the -> operator",
            "A class can only have one constructor"
      ],
      "answer": 1,
      "explanation": "A constructor has no return type and shares the name of the class. It can also be overloaded with multiple signatures."
},
    fillBlank: {
      instructions: "Complete the constructor header for class User:",
      codeTemplate: "class User {\npublic:\n    string name;\n    ___1___(string aName) {\n        name = aName;\n    }\n};",
      blanks: [
        {
                "id": 1,
                "answer": "User",
                "hint": "Constructor must have identical name to the class"
        }
]
    }
  },
  {
    id: "18-object-functions",
    category: "Object-Oriented C++",
    fileSlug: "18_object_functions",
    title: "18. Object Functions (Member Methods)",
    summary: "Add behavior to your classes. Learn how member methods access object state to compute results and perform actions.",
    cBridge: "In C, functions were external procedures that took struct pointers as arguments: student_has_honors(&s). In C++, functions live inside the class and implicitly have access to that object's instance state via the this pointer.",
    content: "\n<h3>Adding Behavior to Classes</h3>\n<p>Classes shouldn't just be passive data holders; they should encapsulate the behaviors and business rules that act on that data. Member functions (often called <em>methods</em>) define what an object can <em>do</em>.</p>\n\n<pre><code>class Student {\n    public:\n        string name;\n        double gpa;\n\n        Student(string aName, double aGpa) {\n            name = aName;\n            gpa = aGpa;\n        }\n\n        bool hasHonors() {\n            return gpa &gt;= 3.5;\n        }\n};</code></pre>\n",
    starterCode: "// 18_object_functions.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Student {\n    public:\n        string name;\n        string major;\n        double gpa;\n\n        Student(string aName, string aMajor, double aGpa) {\n            name = aName;\n            major = aMajor;\n            gpa = aGpa;\n        }\n\n        bool hasHonors() {\n            return gpa >= 3.5;\n        }\n};\n\nint main() {\n    Student s1(\"Jim\", \"Business\", 2.4);\n    Student s2(\"Pam\", \"Art\", 3.6);\n\n    cout << s1.name << \" honors: \" << (s1.hasHonors() ? \"Yes\" : \"No\") << endl;\n    cout << s2.name << \" honors: \" << (s2.hasHonors() ? \"Yes\" : \"No\") << endl;\n\n    return 0;\n}",
    explanation: "s1.hasHonors() evaluates the gpa of s1, while s2.hasHonors() evaluates the gpa of s2.",
    quiz: {
      "question": "How does a member function know which object's data to access?",
      "options": [
            "It accesses global variables",
            "It uses an implicit hidden pointer called 'this' referring to the calling object instance",
            "It reads the command line arguments",
            "It creates a new copy of the object"
      ],
      "answer": 1,
      "explanation": "Member functions receive an implicit 'this' pointer referencing the specific instance on which the method was invoked."
},
    fillBlank: {
      instructions: "Call the member function drive on the myCar object:",
      codeTemplate: "Car myCar;\nmyCar___1___drive();",
      blanks: [
        {
                "id": 1,
                "answer": ".",
                "hint": "Dot operator used to call member functions on an object"
        }
]
    }
  },
  {
    id: "19-getters-and-setters",
    category: "Object-Oriented C++",
    fileSlug: "19_getters_and_setters",
    title: "19. Getters, Setters & Encapsulation",
    summary: "Protect your data with private access specifiers, control mutation, and prevent corrupted state.",
    cBridge: "In C structs, all fields are open and can be modified or corrupted by any piece of code at any time. C++ encapsulation allows you to hide internal representations and enforce validation rules through getters and setters.",
    content: "\n<h3>The Principle of Encapsulation</h3>\n<p>Encapsulation means packaging data and the functions that manipulate that data together, while restricting direct access to internal components.</p>\n\n<h3>Private vs Public</h3>\n<ul>\n  <li><code>public:</code> Accessible from any part of the program.</li>\n  <li><code>private:</code> Accessible <em>only</em> by functions that belong to that class.</li>\n</ul>\n\n<pre><code>class Movie {\n    private:\n        string rating;\n    public:\n        void setRating(string aRating) {\n            if (aRating == \"G\" || aRating == \"PG\" || aRating == \"PG-13\" || aRating == \"R\") {\n                rating = aRating;\n            } else {\n                rating = \"NR\";\n            }\n        }\n        string getRating() {\n            return rating;\n        }\n};</code></pre>\n",
    starterCode: "// 19_getters_and_setters.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Movie {\n    private:\n        string rating;\n\n    public:\n        string title;\n        string director;\n\n        Movie(string aTitle, string aDirector, string aRating) {\n            title = aTitle;\n            director = aDirector;\n            setRating(aRating);\n        }\n\n        void setRating(string aRating) {\n            if (aRating == \"G\" || aRating == \"PG\" || aRating == \"PG-13\" || aRating == \"R\" || aRating == \"NR\") {\n                rating = aRating;\n            } else {\n                rating = \"NR\";\n            }\n        }\n\n        string getRating() {\n            return rating;\n        }\n};\n\nint main() {\n    Movie avengers(\"The Avengers\", \"Joss Whedon\", \"PG-13\");\n    cout << avengers.title << \" rating: \" << avengers.getRating() << endl;\n\n    avengers.setRating(\"Dog\");\n    cout << \"After invalid rating 'Dog': \" << avengers.getRating() << endl;\n\n    return 0;\n}",
    explanation: "Because rating is private, avengers.rating = 'Dog' produces a compiler error. Only setRating can modify it.",
    quiz: {
      "question": "What is the primary benefit of making class attributes private and accessing them via getters and setters?",
      "options": [
            "It makes the program compile faster",
            "It allows data validation and prevents external code from corrupting internal state",
            "It avoids allocating memory on the heap",
            "It enables multithreading automatically"
      ],
      "answer": 1,
      "explanation": "Encapsulation prevents unauthorized direct writes, ensuring that state transitions always obey business validation rules."
},
    fillBlank: {
      instructions: "Fill in the access specifier that restricts member variable visibility to the class itself:",
      codeTemplate: "class Account {\n___1___:\n    double balance;\npublic:\n    double getBalance() { return balance; }\n};",
      blanks: [
        {
                "id": 1,
                "answer": "private",
                "hint": "Access specifier restricting external access"
        }
]
    }
  },
  {
    id: "20-inheritance",
    category: "Object-Oriented C++",
    fileSlug: "20_inheritance",
    title: "20. Inheritance & Method Overriding",
    summary: "Extend classes, share core functionality across types, and override base class methods.",
    cBridge: "C has no built-in mechanism for inheritance. C developers simulated inheritance through awkward nested structs or manual function pointer tables. In C++, inheritance is native, clean, and checked at compile-time.",
    content: "\n<h3>What is Inheritance?</h3>\n<p>Inheritance allows a new class (the <strong>subclass</strong> or derived class) to inherit all public attributes and functions from an existing class (the <strong>superclass</strong> or base class), avoiding duplicate code.</p>\n\n<pre><code>class Chef {\n    public:\n        void makeChicken() {\n            cout &lt;&lt; \"The chef makes chicken\" &lt;&lt; endl;\n        }\n        void makeSpecialDish() {\n            cout &lt;&lt; \"The chef makes bbq ribs\" &lt;&lt; endl;\n        }\n};\n\n// ItalianChef inherits from Chef\nclass ItalianChef : public Chef {\n    public:\n        void makePasta() {\n            cout &lt;&lt; \"The chef makes pasta\" &lt;&lt; endl;\n        }\n        // Overrides base makeSpecialDish\n        void makeSpecialDish() {\n            cout &lt;&lt; \"The chef makes chicken parm\" &lt;&lt; endl;\n        }\n};</code></pre>\n",
    starterCode: "// 20_inheritance.cpp\n#include <iostream>\nusing namespace std;\n\nclass Chef {\n    public:\n        void makeChicken() {\n            cout << \"The chef makes chicken\" << endl;\n        }\n        void makeSalad() {\n            cout << \"The chef makes salad\" << endl;\n        }\n        void makeSpecialDish() {\n            cout << \"The chef makes bbq ribs\" << endl;\n        }\n};\n\nclass ItalianChef : public Chef {\n    public:\n        void makePasta() {\n            cout << \"The chef makes authentic pasta\" << endl;\n        }\n        void makeSpecialDish() {\n            cout << \"The chef makes chicken parmigiana\" << endl;\n        }\n};\n\nint main() {\n    Chef generalChef;\n    ItalianChef mario;\n\n    cout << \"--- General Chef ---\" << endl;\n    generalChef.makeChicken();\n    generalChef.makeSpecialDish();\n\n    cout << endl << \"--- Italian Chef ---\" << endl;\n    mario.makeChicken();      // Inherited from Chef\n    mario.makePasta();        // Defined on ItalianChef\n    mario.makeSpecialDish();  // Overridden\n\n    return 0;\n}",
    explanation: "Inheritance enables both code reuse and specialized extension without modifying the base superclass.",
    quiz: {
      "question": "In class ItalianChef : public Chef, what is Chef called?",
      "options": [
            "The subclass",
            "The superclass (or base class)",
            "The template",
            "The interface"
      ],
      "answer": 1,
      "explanation": "Chef is the superclass (or base class), and ItalianChef is the derived subclass inheriting from it."
},
    fillBlank: {
      instructions: "Fill in the colon and public specifier to derive Dog from Animal:",
      codeTemplate: "class Dog ___1___ ___2___ Animal {\n    // Dog inherits from Animal\n};",
      blanks: [
        {
                "id": 1,
                "answer": ":",
                "hint": "Symbol introducing base class inheritance"
        },
        {
                "id": 2,
                "answer": "public",
                "hint": "Access specifier for public inheritance"
        }
]
    }
  },
  {
    id: "21-structs-modulo-time",
    category: "Intermediate Systems & CLI",
    fileSlug: "21_time_calculations_and_structs",
    title: "21. Structs, Modulo & Time Distance",
    summary: "Master plain-old-data (POD) structs, 24-hour modular arithmetic, time intervals across day boundaries, and clock hand angular distance.",
    cBridge: "In C, you often wrote typedef struct { int h, m, s; } Time; and passed pointers around. In C++, struct declarations automatically define a first-class type without needing typedef, and structs can include member helper methods while keeping all members public by default.",
    content: "<h3>Plain-Old-Data (POD) Structs in C++</h3>\n<p>While C++ classes default their members to <code>private</code>, C++ <code>struct</code> declarations default to <code>public</code>. For data bundles representing timestamps, 2D coordinates, or color codes, structs provide lightweight, expressive records without boilerplates:</p>\n\n<pre><code>struct ClockTime {\n    int hours;\n    int minutes;\n    int seconds;\n\n    // Helper method to convert to total seconds since midnight\n    int toTotalSeconds() const {\n        return (hours * 3600) + (minutes * 60) + seconds;\n    }\n};</code></pre>\n\n<h3>The 24-Hour Modulo Arithmetic Formula</h3>\n<p>Calculating the elapsed duration (time distance) between two timestamps is straightforward when the second time is later in the day: <code>distance = t2 - t1</code>. But what if an event starts at <code>23:45:00</code> and ends at <code>01:15:00</code> the next morning? A naive subtraction yields <code>-22.5 hours</code>!</p>\n<p>To handle day boundaries seamlessly, convert both timestamps to total seconds since midnight (where a full 24-hour day has <code>86,400</code> seconds), and apply modulo arithmetic:</p>\n\n<pre><code>int diffSeconds = (t2_sec - t1_sec + 86400) % 86400;</code></pre>\n<p>Adding <code>86,400</code> before the modulo guarantees the dividend is always positive, even when <code>t2 &lt; t1</code>!</p>\n\n<h3>Clock Hand Angular Distance</h3>\n<p>Given any analog clock time, what is the shortest angular distance in degrees between the hour hand and the minute hand?</p>\n<ul>\n  <li><strong>Minute hand:</strong> Moves 360&deg; in 60 minutes = <code>6.0&deg; per minute</code>.</li>\n  <li><strong>Hour hand:</strong> Moves 360&deg; in 12 hours = 30&deg; per hour = <code>0.5&deg; per minute</code>.</li>\n  <li><strong>Hand position angles:</strong>\n    <br>&bull; &theta;<sub>minute</sub> = <code>6.0 * minutes</code>\n    <br>&bull; &theta;<sub>hour</sub> = <code>(hours % 12) * 30.0 + 0.5 * minutes</code>\n  </li>\n  <li><strong>Shortest angular distance:</strong> Compute the absolute difference <code>&Delta; = |&theta;<sub>hour</sub> - &theta;<sub>minute</sub>|</code>. The shortest path on the circular dial is <code>min(&Delta;, 360.0 - &Delta;)</code>.</li>\n</ul>",
    starterCode: "// 21_time_calculations_and_structs.cpp\n#include <iostream>\n#include <iomanip>\n#include <cmath>\n#include <string>\n\nstruct ClockTime {\n    int hours;\n    int minutes;\n    int seconds;\n\n    int toTotalSeconds() const {\n        return (hours * 3600) + (minutes * 60) + seconds;\n    }\n\n    static ClockTime fromTotalSeconds(int totalSec) {\n        totalSec = (totalSec % 86400 + 86400) % 86400;\n        int h = totalSec / 3600;\n        int m = (totalSec % 3600) / 60;\n        int s = totalSec % 60;\n        return {h, m, s};\n    }\n\n    void print() const {\n        std::cout << std::setfill('0') << std::setw(2) << hours << \":\"\n                  << std::setfill('0') << std::setw(2) << minutes << \":\"\n                  << std::setfill('0') << std::setw(2) << seconds;\n    }\n\n    double getHandAngleDistance() const {\n        double mAngle = minutes * 6.0;\n        double hAngle = (hours % 12) * 30.0 + (minutes * 0.5) + (seconds * (0.5 / 60.0));\n        double diff = std::fabs(hAngle - mAngle);\n        return std::min(diff, 360.0 - diff);\n    }\n};\n\nint main() {\n    ClockTime start{22, 45, 0};\n    ClockTime end{2, 15, 30};\n\n    std::cout << \"=== CLOCK TIMESTAMP & TIME DISTANCE ENGINE ===\" << std::endl;\n    std::cout << \"Start Timestamp : \"; start.print(); std::cout << std::endl;\n    std::cout << \"End Timestamp   : \"; end.print();   std::cout << std::endl;\n\n    int elapsedSec = (end.toTotalSeconds() - start.toTotalSeconds() + 86400) % 86400;\n    ClockTime duration = ClockTime::fromTotalSeconds(elapsedSec);\n\n    std::cout << \"\\nElapsed Duration: \"; duration.print();\n    std::cout << \" (\" << elapsedSec << \" total seconds)\" << std::endl;\n\n    std::cout << std::fixed << std::setprecision(1);\n    std::cout << \"Start Hand Angle: \" << start.getHandAngleDistance() << \" degrees\" << std::endl;\n    std::cout << \"End Hand Angle  : \" << end.getHandAngleDistance() << \" degrees\" << std::endl;\n\n    return 0;\n}",
    explanation: "Notice how modular arithmetic effortlessly handles midnight rollover, and how structs group time components cleanly.",
    quiz: {
      "question": "Why is + 86400 added before applying % 86400 when calculating time distance?",
      "options": [
            "To convert seconds into milliseconds",
            "To ensure the dividend is non-negative when end time is on the next day",
            "To account for daylight savings time",
            "Because C++ requires modulo operands to be larger than 86400"
      ],
      "answer": 1,
      "explanation": "If t2 is 01:00:00 and t1 is 23:00:00, t2 - t1 is negative (-22 hours). Adding 86400 shifts it into a positive number so % 86400 yields the correct +2 hours."
},
    fillBlank: {
      instructions: "Complete the formula to calculate the minute hand angle in degrees from minutes:",
      codeTemplate: "double minuteHandAngle = minutes * ___1___;\ndouble elapsedPositive = (t2_sec - t1_sec + ___2___) % 86400;",
      blanks: [
        {
                "id": 1,
                "answer": "6.0",
                "hint": "Degrees per minute (360 degrees / 60 minutes)"
        },
        {
                "id": 2,
                "answer": "86400",
                "hint": "Total seconds in a 24-hour day"
        }
]
    }
  },
  {
    id: "22-ansi-terminal-graphics",
    category: "Intermediate Systems & CLI",
    fileSlug: "22_ansi_colors_and_terminal_art",
    title: "22. ANSI Terminal Art & 24-Bit TrueColor",
    summary: "Unlock 24-bit TrueColor RGB terminal styling, in-place re-rendering, and interactive console UI design.",
    cBridge: "In legacy Windows C, developers relied on <windows.h> and SetConsoleTextAttribute(hConsole, FOREGROUND_RED), which was non-portable and limited to 16 colors. Modern C++ utilizes cross-platform ANSI Virtual Terminal escape sequences supporting 16.7 million 24-bit TrueColor RGB shades directly over standard output streams.",
    content: "<h3>What are ANSI Escape Sequences?</h3>\n<p>An ANSI escape sequence is a special in-band signaling code sent directly through <code>std::cout</code>. When your terminal emulator encounters the escape character (<code>\\x1b</code> or <code>\u001b</code>), it does not print characters—instead, it alters text colors, positions the cursor, or clears screen regions.</p>\n\n<h3>The 24-Bit TrueColor Format</h3>\n<p>Modern terminal emulators (Windows Terminal, VS Code Terminal, iTerm2, macOS Terminal) support 24-bit RGB TrueColor with 16.7 million shades:</p>\n<ul>\n  <li><strong>Foreground Text Color:</strong> <code>\\x1b[38;2;R;G;Bm</code></li>\n  <li><strong>Background Box Color:</strong> <code>\\x1b[48;2;R;G;Bm</code></li>\n  <li><strong>Reset All Styles:</strong> <code>\\x1b[0m</code></li>\n</ul>\n\n<pre><code>// Print vibrant gold text on deep navy background\nstd::cout &lt;&lt; \"\\x1b[38;2;255;215;0;48;2;10;25;50m Hello C++! \\x1b[0m\" &lt;&lt; std::endl;</code></pre>\n\n<h3>Text Attributes & In-Place Cursor Movement</h3>\n<p>You can combine colors with text styling attributes:</p>\n<ul>\n  <li><code>\\x1b[1m</code>: <strong>Bold text</strong></li>\n  <li><code>\\x1b[4m</code>: <u>Underline text</u></li>\n  <li><code>\\x1b[1A</code>: Move cursor UP 1 line</li>\n  <li><code>\\x1b[2K</code>: Clear current line</li>\n</ul>\n<p>By moving the cursor up and clearing the line, you can overwrite previous console output in place—enabling animated loading spinners, progress bars, and game loops without flickering full-screen refreshes!</p>",
    starterCode: "// 22_ansi_colors_and_terminal_art.cpp\n#include <iostream>\n#include <string>\n\nnamespace Color {\n    const std::string RESET     = \"\\033[0m\";\n    const std::string BOLD      = \"\\033[1m\";\n    const std::string UNDERLINE = \"\\033[4m\";\n\n    std::string fg(int r, int g, int b) {\n        return \"\\033[38;2;\" + std::to_string(r) + \";\" + std::to_string(g) + \";\" + std::to_string(b) + \"m\";\n    }\n\n    std::string bg(int r, int g, int b) {\n        return \"\\033[48;2;\" + std::to_string(r) + \";\" + std::to_string(g) + \";\" + std::to_string(b) + \"m\";\n    }\n}\n\nint main() {\n    std::cout << Color::BOLD << Color::fg(30, 144, 255)\n              << \"=== ANSI 24-BIT TRUECOLOR TERMINAL DEMO ===\" << Color::RESET << \"\\n\\n\";\n\n    int palette[][3] = {\n        {100, 220, 255},\n        {40, 220, 130},\n        {255, 200, 70},\n        {255, 85, 100}\n    };\n    std::string labels[] = {\"FROST\", \"EMERALD\", \"AMBER\", \"CRIMSON\"};\n\n    for (int i = 0; i < 4; ++i) {\n        int r = palette[i][0], g = palette[i][1], b = palette[i][2];\n        std::cout << Color::bg(r, g, b) << Color::fg(10, 10, 10) << Color::BOLD\n                  << \"  \" << labels[i] << \"  \" << Color::RESET << \" \";\n        std::cout << Color::fg(r, g, b) << \"RGB(\" << r << \", \" << g << \", \" << b << \")\"\n                  << Color::RESET << \"\\n\";\n    }\n\n    std::cout << \"\\n\" << Color::UNDERLINE << \"Terminal UI Box:\" << Color::RESET << \"\\n\";\n    std::cout << Color::bg(30, 30, 45) << Color::fg(140, 230, 160)\n              << \" [SUCCESS] ANSI color pipeline verified! \"\n              << Color::RESET << \"\\n\";\n\n    return 0;\n}",
    explanation: "Encapsulating ANSI escape codes inside a Color namespace creates clean, maintainable UI functions.",
    quiz: {
      "question": "What is the ANSI sequence to set a 24-bit TrueColor background?",
      "options": [
            "\\\u001b[38;2;R;G;Bm",
            "\\\u001b[48;2;R;G;Bm",
            "\\\u001b[RGB;R;G;Bm",
            "\\\u001b[COLOR;BG;R;G;Bm"
      ],
      "answer": 1,
      "explanation": "38;2 designates foreground RGB text, while 48;2 designates background RGB cell fill."
},
    fillBlank: {
      instructions: "Fill in the missing escape code parameter and reset sequence:",
      codeTemplate: "// Set foreground TrueColor and reset after printing\nstd::cout << \"\\x1b[___1___;2;255;100;50m\" << \"Warning!\" << \"___2___\";",
      blanks: [
        {
                "id": 1,
                "answer": "38",
                "hint": "Code for foreground color"
        },
        {
                "id": 2,
                "answer": "\\\u001b[0m",
                "hint": "Escape sequence to reset styles"
        }
]
    }
  },
  {
    id: "23-stl-vectors-and-random",
    category: "Intermediate Systems & CLI",
    fileSlug: "23_stl_vectors_and_random",
    title: "23. STL Vectors & Modern Random Engines",
    summary: "Replace fixed arrays with dynamic std::vector containers and generate cryptographically sound randomness with <random>.",
    cBridge: "In C, dynamic lists required malloc(), realloc(), free(), manual capacity tracking, and rand() % N (which suffers from severe modulo bias). In C++, std::vector<T> automatically manages heap allocation via RAII, and <random>'s std::mt19937 provides high-entropy, uniformly distributed pseudo-random numbers.",
    content: "<h3>Why std::vector Replaces Raw Arrays</h3>\n<p>Unlike fixed C arrays (<code>int arr[10];</code>) whose size must be known at compile time, <code>std::vector&lt;T&gt;</code> is a dynamic array that automatically resizes as elements are added:</p>\n\n<pre><code>#include &lt;vector&gt;\n\nstd::vector&lt;std::string&gt; words;\nwords.push_back(\"CRANE\");\nwords.push_back(\"LIGHT\");\nwords.push_back(\"DANCE\");\n\nstd::cout &lt;&lt; \"Word count: \" &lt;&lt; words.size() &lt;&lt; std::endl;</code></pre>\n\n<h3>Passing Vectors Efficiently</h3>\n<p>Passing a vector by value creates a full copy of all its elements. To avoid memory overhead, pass vectors by <code>const</code> reference:</p>\n<pre><code>void printWords(const std::vector&lt;std::string&gt;&amp; list) {\n    for (const auto&amp; w : list) {\n        std::cout &lt;&lt; w &lt;&lt; \" \";\n    }\n}</code></pre>\n\n<h3>Modern Randomness with &lt;random&gt;</h3>\n<p>In early C tutorials, you might have seen <code>rand() % N</code>. That method has two serious flaws: <code>rand()</code> produces low-entropy numbers with poor statistical distribution, and the modulo operator introduces severe <em>modulo bias</em> when <code>RAND_MAX</code> is not divisible by <code>N</code>.</p>\n<p>Modern C++ provides the <code>&lt;random&gt;</code> library:</p>\n<ul>\n  <li><code>std::random_device rd;</code> &mdash; Provides a non-deterministic hardware seed.</li>\n  <li><code>std::mt19937 gen(rd());</code> &mdash; The 32-bit Mersenne Twister engine with a massive period of 2<sup>19937</sup> - 1.</li>\n  <li><code>std::uniform_int_distribution&lt;int&gt; dist(0, maxIndex);</code> &mdash; Guarantees every index has an equal mathematical probability.</li>\n</ul>",
    starterCode: "// 23_stl_vectors_and_random.cpp\n#include <iostream>\n#include <vector>\n#include <string>\n#include <random>\n\nstd::string pickRandomWord(const std::vector<std::string>& dictionary, std::mt19937& rng) {\n    if (dictionary.empty()) return \"\";\n    std::uniform_int_distribution<size_t> dist(0, dictionary.size() - 1);\n    return dictionary[dist(rng)];\n}\n\nint main() {\n    std::vector<std::string> wordList = {\n        \"ALIEN\", \"CRANE\", \"DANCE\", \"EAGLE\", \"FLAME\",\n        \"GRAPE\", \"HEART\", \"LIGHT\", \"OCEAN\", \"PLANT\"\n    };\n\n    std::random_device rd;\n    std::mt19937 rng(rd());\n\n    std::cout << \"Loaded \" << wordList.size() << \" words into dynamic vector.\" << std::endl;\n    std::cout << \"Picking 3 random words for game rounds:\\n\" << std::endl;\n\n    for (int round = 1; round <= 3; ++round) {\n        std::string chosen = pickRandomWord(wordList, rng);\n        std::cout << \"Round \" << round << \" Word: \" << chosen\n                  << \" (Length: \" << chosen.length() << \")\" << std::endl;\n    }\n\n    return 0;\n}",
    explanation: "Vectors handle memory growth automatically while std::mt19937 ensures true statistical uniformity.",
    quiz: {
      "question": "Why should vectors usually be passed as const std::vector<T>& to functions?",
      "options": [
            "To allow the function to delete the vector",
            "To avoid copying all vector elements while preventing accidental modification",
            "Because vectors cannot be passed by value in C++",
            "To force the compiler to allocate the vector on the stack"
      ],
      "answer": 1,
      "explanation": "Passing by const reference avoids the performance penalty of deep-copying vector contents and guarantees the caller's data remains unmodified."
},
    fillBlank: {
      instructions: "Fill in the distribution type and method to add an item to a vector:",
      codeTemplate: "std::vector<int> numbers;\nnumbers.___1___(42);\n\nstd::___2___<int> dist(0, 9);",
      blanks: [
        {
                "id": 1,
                "answer": "push_back",
                "hint": "Method to append an element to a vector"
        },
        {
                "id": 2,
                "answer": "uniform_int_distribution",
                "hint": "Distribution that gives equal probability to all integers in range"
        }
]
    }
  },
  {
    id: "24-capstone-wordle",
    category: "Luis's Capstone Projects",
    fileSlug: "24_capstone_terminal_wordle",
    title: "24. Capstone 1: Terminal Wordle with TrueColor Themes",
    summary: "Architect and build an interactive terminal Wordle game with custom TrueColor themes, 2-pass duplicate letter logic, and live keyboard tracking.",
    cBridge: "Building this project ties together namespaces, structs, vectors, ANSI TrueColor escape codes, string manipulation, and game loops into a cohesive, production-grade CLI application.",
    content: "<h3>Build the Game in Reliable Steps</h3>\n<p>Start with one fixed secret word and one round. First read a complete line with <code>std::getline</code>, trim or reject extra characters, convert safely to uppercase, and accept only a five-letter guess. Invalid input should explain the expected format and should not consume an attempt. After that works, add the six-attempt loop, then the two-pass duplicate-letter feedback, then a keyboard summary, and finally a replay prompt. Keep the secret, attempt count, feedback, and keyboard state in local variables; use small functions for input, scoring, and display.</p>\n<p>The starter code below demonstrates the scoring and display stages with sample guesses. It is not yet the interactive game described above: replace the demo guesses with validated input and add replay before calling the project complete. Keep ANSI styling optional and ensure plain text still communicates the result.</p>\n\n<h3>System Architecture of Terminal Wordle</h3>\n<p>Wordle is a world-famous word deduction game: the player has 6 attempts to guess a 5-letter hidden word. For each guess, the terminal provides color-coded feedback for every character:</p>\n<ul>\n  <li><strong style=\"color: #50fa7b;\">Green (Correct):</strong> The letter is in the secret word and at the exact position.</li>\n  <li><strong style=\"color: #f1fa8c;\">Yellow (Present):</strong> The letter is in the secret word, but in a different position.</li>\n  <li><strong style=\"color: #6272a4;\">Grey / Red (Absent):</strong> The letter is not in the secret word (or has already been accounted for).</li>\n</ul>\n\n<h3>The 2-Pass Duplicate Letter Algorithm</h3>\n<p>A classic bug in naive Wordle clones occurs with duplicate letters. For example, if the secret word is <code>APPLE</code> and the player guesses <code>PUPPY</code>, how many <code>P</code>s should turn yellow? <code>APPLE</code> only has <strong>two</strong> P's! A single-pass loop might highlight all three P's.</p>\n<p>The standard solution is a <strong>two-pass algorithm</strong>:</p>\n<ol>\n  <li><strong>Frequency Map:</strong> Count letter frequencies in the secret word.</li>\n  <li><strong>Pass 1 (Greens):</strong> Identify exact matches (<code>guess[i] == secret[i]</code>). Mark these positions as Green, and decrement the letter's available count.</li>\n  <li><strong>Pass 2 (Yellows &amp; Greys):</strong> For positions not yet marked Green: if the letter exists in the pool with available count &gt; 0, mark it Yellow and decrement; otherwise mark it Grey/Absent.</li>\n</ol>\n\n<h3>Live Keyboard Letter Matrix</h3>\n<p>To provide great UX, our implementation displays a live keyboard tracker showing which letters from A to Z are known-good, misplaced, or eliminated, so the player never re-enters dead letters!</p>",
    starterCode: "// 24_capstone_terminal_wordle.cpp\n#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\n#include <cctype>\n#include <algorithm>\n\nnamespace WordleUI {\n    const std::string RESET     = \"\\033[0m\";\n    const std::string BOLD      = \"\\033[1m\";\n    const std::string GREEN_BG  = \"\\033[48;2;40;180;90;38;2;255;255;255;1m\";\n    const std::string YELLOW_BG = \"\\033[48;2;220;180;30;38;2;10;10;10;1m\";\n    const std::string GREY_BG   = \"\\033[48;2;60;65;75;38;2;220;220;220m\";\n\n    std::string toUpper(std::string s) {\n        for (char& c : s) c = std::toupper(static_cast<unsigned char>(c));\n        return s;\n    }\n}\n\nenum LetterState { UNUSED, ABSENT, PRESENT, CORRECT };\n\nvoid printKeyboard(const std::map<char, LetterState>& kb) {\n    std::cout << \"\\nRemaining Letters: \";\n    for (char c = 'A'; c <= 'Z'; ++c) {\n        auto it = kb.find(c);\n        LetterState state = (it != kb.end()) ? it->second : UNUSED;\n        if (state == CORRECT)       std::cout << \"\\033[38;2;40;220;120;1m\" << c << \" \" << WordleUI::RESET;\n        else if (state == PRESENT)  std::cout << \"\\033[38;2;240;200;60;1m\" << c << \" \" << WordleUI::RESET;\n        else if (state == ABSENT)   std::cout << \"\\033[38;2;90;90;100m\"    << c << \" \" << WordleUI::RESET;\n        else                        std::cout << \"\\033[38;2;200;210;225m\"  << c << \" \" << WordleUI::RESET;\n    }\n    std::cout << \"\\n\" << std::endl;\n}\n\nint main() {\n    const std::string secretWord = \"CRANE\";\n    const int maxAttempts = 6;\n    int attempts = 0;\n    bool won = false;\n    std::map<char, LetterState> keyboard;\n\n    std::cout << WordleUI::BOLD << \"\\033[38;2;100;220;255m\"\n              << \"========================================\\n\"\n              << \"          C++ TERMINAL WORDLE           \\n\"\n              << \"========================================\\n\" << WordleUI::RESET;\n    std::cout << \"Guess the 5-letter secret word in 6 tries!\\n\";\n\n    std::vector<std::string> demoGuesses = {\"PLANT\", \"DRAKE\", \"CRANE\"};\n\n    for (const auto& rawGuess : demoGuesses) {\n        if (won || attempts >= maxAttempts) break;\n        std::string guess = WordleUI::toUpper(rawGuess);\n        if (guess.length() != 5) continue;\n\n        attempts++;\n        std::vector<int> feedback(5, 0);\n        std::map<char, int> secretFreq;\n        for (char c : secretWord) secretFreq[c]++;\n\n        // Pass 1: Greens\n        for (int i = 0; i < 5; ++i) {\n            if (guess[i] == secretWord[i]) {\n                feedback[i] = 2;\n                secretFreq[guess[i]]--;\n                keyboard[guess[i]] = CORRECT;\n            }\n        }\n        // Pass 2: Yellows\n        for (int i = 0; i < 5; ++i) {\n            if (feedback[i] == 2) continue;\n            if (secretFreq[guess[i]] > 0) {\n                feedback[i] = 1;\n                secretFreq[guess[i]]--;\n                if (keyboard[guess[i]] != CORRECT) keyboard[guess[i]] = PRESENT;\n            } else {\n                if (keyboard[guess[i]] == UNUSED) keyboard[guess[i]] = ABSENT;\n            }\n        }\n\n        std::cout << \"Attempt \" << attempts << \"/\" << maxAttempts << \": \";\n        for (int i = 0; i < 5; ++i) {\n            if      (feedback[i] == 2) std::cout << WordleUI::GREEN_BG  << \" \" << guess[i] << \" \" << WordleUI::RESET << \" \";\n            else if (feedback[i] == 1) std::cout << WordleUI::YELLOW_BG << \" \" << guess[i] << \" \" << WordleUI::RESET << \" \";\n            else                       std::cout << WordleUI::GREY_BG   << \" \" << guess[i] << \" \" << WordleUI::RESET << \" \";\n        }\n        std::cout << std::endl;\n\n        if (guess == secretWord) { won = true; break; }\n    }\n\n    printKeyboard(keyboard);\n\n    if (won) std::cout << \"\\033[38;2;255;215;0;1mCORRECT! Solved in \" << attempts << \" attempts!\\033[0m\\n\";\n    else     std::cout << \"Game Over. The secret word was: \" << secretWord << \"\\n\";\n\n    return 0;\n}",
    explanation: "This complete capstone demonstrates the 2-pass matching algorithm, ANSI color blocks, and live keyboard tracking.",
    quiz: {
      "question": "Why is a 2-pass algorithm necessary when evaluating Wordle guesses?",
      "options": [
            "To check if the word is spelled in reverse",
            "To correctly mark exact green matches first so duplicate letters are not falsely marked yellow",
            "Because C++ strings can only be looped through twice",
            "To calculate elapsed execution time"
      ],
      "answer": 1,
      "explanation": "Pass 1 consumes the frequency of exact green matches, ensuring subsequent yellow checks don't exceed the true count of remaining duplicate letters."
},
    fillBlank: {
      instructions: "Fill in the loop condition for the first pass (exact match detection):",
      codeTemplate: "// Pass 1: Find exact green matches\nfor (int i = 0; i < 5; ++i) {\n    if (guess[i] ___1___ secretWord[i]) {\n        feedback[i] = 2;\n        secretFreq[guess[i]]___2___;\n    }\n}",
      blanks: [
        {
                "id": 1,
                "answer": "==",
                "hint": "Comparison operator for equality"
        },
        {
                "id": 2,
                "answer": "--",
                "hint": "Decrement operator to reduce remaining available count"
        }
]
    }
  },
  {
    id: "25-2d-vectors-and-normalization",
    category: "Luis's Capstone Projects",
    fileSlug: "25_2d_vectors_and_normalization",
    title: "25. 2D Vectors, Dynamic Grids & Data Normalization",
    summary: "Master multi-dimensional dynamic matrices (std::vector<std::vector<int>>) and linear data normalization (lerp) from arbitrary raw scales to color spaces.",
    cBridge: "In C, 2D dynamic arrays required an array of pointers (int**) with nested loops of malloc() and free(). In C++, a single line std::vector<std::vector<int>> grid(rows, std::vector<int>(cols)) creates a memory-safe, contiguous 2D grid with bounds-checking via .at(r).at(c).",
    content: "<h3>Input and Data Boundaries</h3>\n<p>Use formatted numeric input with explicit prompts. Check that dimensions are positive and reasonably bounded before allocating the nested vector; reject malformed cells with a clear message. Keep loading separate from normalization and rendering.</p>\n\n<h3>Allocating 2D Grids with Vectors</h3>\n<p>A 2D vector in C++ is a vector of vectors: <code>std::vector&lt;std::vector&lt;T&gt;&gt;</code>. You can dynamically instantiate a grid with <code>R</code> rows and <code>C</code> columns initialized to a default value in a single statement:</p>\n\n<pre><code>int rows = 10, cols = 20;\nstd::vector&lt;std::vector&lt;int&gt;&gt; grid(rows, std::vector&lt;int&gt;(cols, 0));\n\ngrid[2][5] = 42; // Access row 2, column 5</code></pre>\n\n<h3>Finding Bounds: Min, Max &amp; Range</h3>\n<p>When working with real elevation matrices, temperatures, or population datasets, raw values range from negative depths (e.g. -86 meters in Death Valley) to massive heights (e.g. 8,848 meters on Mount Everest). To render these visually, you must find the minimum and maximum values:</p>\n\n<pre><code>int minVal = grid[0][0];\nint maxVal = grid[0][0];\n\nfor (const auto&amp; row : grid) {\n    for (int cell : row) {\n        if (cell &lt; minVal) minVal = cell;\n        if (cell &gt; maxVal) maxVal = cell;\n    }\n}\nint range = maxVal - minVal;\nif (range == 0) range = 1; // Prevent division by zero!</code></pre>\n\n<h3>Linear Normalization (Lerping to 0–255)</h3>\n<p>To map any arbitrary elevation value into an 8-bit color index (<code>0</code> to <code>255</code>), use linear scaling:</p>\n\n<pre><code>int colorIndex = (cell - minVal) * 255 / range;</code></pre>\n<p>This guarantees that the lowest elevation maps to <code>0</code>, the highest peak maps to <code>255</code>, and all intermediate terrain scales smoothly.</p>",
    starterCode: "// 25_2d_vectors_and_normalization.cpp\n#include <iostream>\n#include <vector>\n#include <iomanip>\n\nint main() {\n    std::vector<std::vector<int>> elevation = {\n        {1200, 1450, 1800, 1950, 1600},\n        {1350, 2100, 2850, 2400, 1750},\n        {1100, 1950, 3100, 2700, 1500},\n        { 950, 1200, 1600, 1400, 1050}\n    };\n\n    int rows = elevation.size();\n    int cols = elevation[0].size();\n\n    int minVal = elevation[0][0];\n    int maxVal = elevation[0][0];\n\n    for (int r = 0; r < rows; ++r)\n        for (int c = 0; c < cols; ++c) {\n            if (elevation[r][c] < minVal) minVal = elevation[r][c];\n            if (elevation[r][c] > maxVal) maxVal = elevation[r][c];\n        }\n\n    int range = maxVal - minVal;\n    if (range == 0) range = 1;\n\n    std::cout << \"Terrain: \" << rows << \" rows x \" << cols << \" cols\" << std::endl;\n    std::cout << \"Min: \" << minVal << \" m   Max: \" << maxVal << \" m   Range: \" << range << \" m\\n\\n\";\n    std::cout << \"Normalized Intensity Matrix (0-255):\" << std::endl;\n\n    for (int r = 0; r < rows; ++r) {\n        for (int c = 0; c < cols; ++c) {\n            int norm = (elevation[r][c] - minVal) * 255 / range;\n            std::cout << std::setw(4) << norm << \" \";\n        }\n        std::cout << std::endl;\n    }\n\n    return 0;\n}",
    explanation: "2D vectors represent matrices cleanly, and linear normalization maps arbitrary data into visual color space.",
    quiz: {
      "question": "What critical check must be performed before normalizing values using (val - min) * 255 / range?",
      "options": [
            "Check that range is non-zero to avoid division by zero if all cells are identical",
            "Check that all cells are negative",
            "Check that rows equals cols",
            "Convert the matrix to a single-dimensional array"
      ],
      "answer": 0,
      "explanation": "If all cells in the grid share the exact same value, maxVal equals minVal, making range 0. Dividing by zero causes a CPU crash."
},
    fillBlank: {
      instructions: "Fill in the normalization formula to map cell into the 0-255 scale:",
      codeTemplate: "int range = maxVal - minVal;\nif (range == 0) range = 1;\nint normalized = (cell - minVal) * ___1___ / ___2___;",
      blanks: [
        {
                "id": 1,
                "answer": "255",
                "hint": "Maximum target color intensity"
        },
        {
                "id": 2,
                "answer": "range",
                "hint": "The span between max and min"
        }
]
    }
  },
  {
    id: "26-capstone-elevation-heatmap",
    category: "Luis's Capstone Projects",
    fileSlug: "26_capstone_elevation_heatmap",
    title: "26. Capstone 2: 2D Elevation Heat Map Renderer",
    summary: "Build a high-density 2D terrain visualizer using procedural color transfer gradients, sea-level clipping, and ANSI TrueColor background blocks.",
    cBridge: "In this capstone, 2D dynamic matrices meet ANSI escape sequences: by outputting double-space characters with 24-bit background colors, standard console text transforms into a high-density raster display.",
    content: "<h3>Input and Data Boundaries</h3>\n<p>The source project bundles a very large map through a preprocessor include and uses terse numeric menus. That couples data distribution to compilation and makes choices hard to understand. This capstone uses a small self-contained sample: show a labeled default map first, then offer optional settings with named choices, validate each answer, and include a legend. For manual grids, verify dimensions and every value before rendering.</p>\n\n<h3>Raster Graphics Inside a Text Terminal</h3>\n<p>How did our friend Luis render full-color topographical maps in the command line? The secret is surprisingly simple: <strong>double-space background color blocks</strong>.</p>\n<p>Because terminal characters are roughly twice as tall as they are wide, printing two space characters with a colored background <code>\\x1b[48;2;R;G;Bm  \\x1b[0m</code> produces an almost perfectly square pixel!</p>\n\n<h3>Designing Procedural Color Ramps</h3>\n<p>To turn normalized elevation values (<code>0 &ndash; 255</code>) into colorful terrain, we pass the normalized value into a <strong>color transfer function</strong>:</p>\n<ul>\n  <li><strong>Thermal Red-to-Green:</strong>\n    <br>&bull; Low values: Pure Red <code>(255, 2*val, 0)</code>\n    <br>&bull; High values: Pure Green <code>(2*(255-val), 255, 0)</code>\n  </li>\n  <li><strong>Spectral Rainbow Gradient:</strong>\n    <br>Multiplies the 0&ndash;255 index across 5 color segments: Navy &rarr; Cyan &rarr; Green &rarr; Yellow &rarr; Fiery Red.\n  </li>\n</ul>\n\n<h3>Sea-Level Masking &amp; Real Geographic Data</h3>\n<p>In real elevation models, values below 0 meters represent oceans and water bodies. Our implementation supports a <strong>sea level baseline toggle</strong>, automatically rendering water depths in oceanic dark blue/black while applying the terrain gradient strictly to dry land.</p>",
    starterCode: "// 26_capstone_elevation_heatmap.cpp\n#include <iostream>\n#include <vector>\n#include <cmath>\n#include <algorithm>\n\nvoid printRainbowPixel(int val) {\n    if (val < 0) { std::cout << \"\\033[48;2;10;15;35m  \\033[0m\"; return; }\n    int scaled = val * 5;\n    int r = 0, g = 0, b = 0;\n    if      (scaled <= 255)   { r = 255;           g = scaled;        b = 0;             }\n    else if (scaled <= 510)   { r = 510 - scaled;  g = 255;           b = 0;             }\n    else if (scaled <= 765)   { r = 0;             g = 255;           b = scaled - 510;  }\n    else if (scaled <= 1020)  { r = 0;             g = 1020 - scaled; b = 255;           }\n    else                      { r = scaled - 1020; g = 0;             b = 255;           }\n    std::cout << \"\\033[48;2;\" << r << \";\" << g << \";\" << b << \"m  \\033[0m\";\n}\n\nvoid renderMap(const std::vector<std::vector<int>>& grid, bool useSeaLevel = true) {\n    if (grid.empty() || grid[0].empty()) return;\n    int rows = grid.size(), cols = grid[0].size();\n    int minVal = grid[0][0], maxVal = grid[0][0];\n    for (const auto& row : grid)\n        for (int cell : row) {\n            if (cell < minVal) minVal = cell;\n            if (cell > maxVal) maxVal = cell;\n        }\n    int baseline = useSeaLevel ? std::max(0, minVal) : minVal;\n    int range = std::max(1, maxVal - baseline);\n    std::cout << \"\\nTopography (\" << cols << \"x\" << rows << \") Peak:\" << maxVal << \"m Min:\" << minVal << \"m\\n\";\n    for (int r = 0; r < rows; ++r) {\n        for (int c = 0; c < cols; ++c) {\n            int cell = grid[r][c];\n            if (useSeaLevel && cell <= 0) { printRainbowPixel(-1); continue; }\n            int norm = std::clamp((cell - baseline) * 255 / range, 0, 255);\n            printRainbowPixel(norm);\n        }\n        std::cout << \"\\n\";\n    }\n}\n\nint main() {\n    std::cout << \"=== 2D ELEVATION HEAT MAP RENDERER ===\\n\";\n    const int R = 12, C = 20;\n    std::vector<std::vector<int>> island(R, std::vector<int>(C, 0));\n    double cR = R / 2.0, cC = C / 2.0;\n    for (int r = 0; r < R; ++r)\n        for (int c = 0; c < C; ++c) {\n            double dist = std::sqrt((r-cR)*(r-cR) + (c-cC)*(c-cC));\n            island[r][c] = static_cast<int>(3500.0 - dist * 550.0);\n        }\n    renderMap(island, true);\n    std::cout << \"\\nLegend: Dark = Ocean, Warm = Lowlands, Violet = Summit\\n\";\n    return 0;\n}",
    explanation: "Double-space colored blocks act as square terminal pixels, transforming 2D vectors into raster topography.",
    quiz: {
      "question": "Why do terminal heat map renderers use two spaces (  ) instead of one space for each pixel?",
      "options": [
            "Because terminal fonts are monospace and approximately twice as tall as they are wide",
            "Because C++ strings cannot output single spaces",
            "To save CPU memory",
            "To satisfy the ANSI escape standard"
      ],
      "answer": 0,
      "explanation": "Terminal character cells are typically rectangular with an aspect ratio of roughly 1:2 (width:height). Printing two spaces makes the colored block square."
},
    fillBlank: {
      instructions: "Complete the ANSI background TrueColor escape sequence for terminal pixels:",
      codeTemplate: "// Output double-space with RGB background\nstd::cout << \"\\\u001b[___1___;2;\" << r << \";\" << g << \";\" << b << \"m  \\\u001b[___2___m\";",
      blanks: [
        {
                "id": 1,
                "answer": "48",
                "hint": "Code for background TrueColor"
        },
        {
                "id": 2,
                "answer": "0",
                "hint": "Code to reset styles"
        }
]
    }
  },
  {
    id: "27-sets-maps-and-bit-manipulation",
    category: "Luis's Capstone Projects",
    fileSlug: "27_sets_maps_and_bit_manipulation",
    title: "27. Sets, Maps & Binary Minterm Generation",
    summary: "Harness associative STL containers (std::set, std::map) and bitwise operations to discover variables and generate 2^N binary truth tables.",
    cBridge: "In C, checking for unique characters required manual frequency arrays or hash tables. In C++, std::set<char> maintains a self-balancing Red-Black tree that keeps unique elements sorted in O(log N) time, while std::map<char, int> binds variable names to bit positions.",
    content: "<h3>Extracting Unique Variables with std::set</h3>\n<p>When an algebraic expression like <code>AB + B'C + A(C ^ D)</code> is entered, how does a program know which variables exist? In C++, <code>std::set&lt;char&gt;</code> only stores unique items and automatically keeps them in alphabetical order:</p>\n\n<pre><code>#include &lt;set&gt;\n\nstd::string formula = \"A(B + C') = AB + AC\";\nstd::set&lt;char&gt; variables;\n\nfor (char c : formula) {\n    if (std::isalpha(c)) {\n        variables.insert(c);\n    }\n}\n// variables now contains: {'A', 'B', 'C'} (size = 3)</code></pre>\n\n<h3>Binding Variables to Bits with std::map</h3>\n<p>Once unique variables are discovered, we assign each variable a 0-indexed bit column position using <code>std::map&lt;char, int&gt;</code>:</p>\n\n<pre><code>#include &lt;map&gt;\n\nstd::map&lt;char, int&gt; varMap;\nint index = 0;\nfor (char var : variables) {\n    varMap[var] = index++;\n}\n// 'A' -&gt; 0, 'B' -&gt; 1, 'C' -&gt; 2</code></pre>\n\n<h3>Generating All 2<sup>N</sup> Minterms with Bit Shifts</h3>\n<p>For <code>N</code> variables, there are exactly 2<sup>N</sup> possible true/false combinations (minterms). We can loop through all combinations using a single integer and the bitwise left-shift operator <code>(1 &lt;&lt; N)</code>:</p>\n\n<pre><code>int totalMinterms = 1 &lt;&lt; variables.size(); // 2^N\n\nfor (int i = 0; i &lt; totalMinterms; ++i) {\n    // Extract bit for each variable\n    for (char var : variables) {\n        int bitPos = varMap[var];\n        // Shift bit to the right and mask with 1\n        int bitValue = (i &gt;&gt; (variables.size() - 1 - bitPos)) &amp; 1;\n    }\n}</code></pre>",
    starterCode: "// 27_sets_maps_and_bit_manipulation.cpp\n#include <iostream>\n#include <string>\n#include <set>\n#include <map>\n#include <cctype>\n\nstd::string intToBin(int num, int bits) {\n    std::string s = \"\";\n    for (int i = bits - 1; i >= 0; --i)\n        s += ((num >> i) & 1) ? '1' : '0';\n    return s;\n}\n\nint main() {\n    std::string expression = \"A'B + BC'\";\n    std::cout << \"Expression: \" << expression << \"\\n\\n\";\n\n    std::set<char> vars;\n    for (char c : expression)\n        if (std::isalpha(static_cast<unsigned char>(c))) vars.insert(c);\n\n    std::cout << \"Variables (\" << vars.size() << \"): \";\n    for (char v : vars) std::cout << v << \" \";\n    std::cout << \"\\n\\n\";\n\n    int n = vars.size();\n    int combinations = 1 << n;\n\n    std::cout << \"Row | \";\n    for (char v : vars) std::cout << v << \" \";\n    std::cout << \"| Binary\\n\";\n    std::cout << \"----+---+--------\\n\";\n\n    for (int i = 0; i < combinations; ++i) {\n        std::string bin = intToBin(i, n);\n        std::cout << \" \" << i << \"  | \";\n        for (int j = 0; j < n; ++j) std::cout << bin[j] << \" \";\n        std::cout << \"| \" << bin << \"\\n\";\n    }\n\n    return 0;\n}",
    explanation: "Bitwise left-shift (1 << N) calculates powers of two instantly, and right-shift extracts individual bit values.",
    quiz: {
      "question": "What does (1 << 4) evaluate to in C++?",
      "options": [
            "4",
            "8",
            "16",
            "32"
      ],
      "answer": 2,
      "explanation": "1 shifted left by 4 bits computes 2^4 = 16."
},
    fillBlank: {
      instructions: "Complete the bitwise expression to check if the k-th bit of integer x is set:",
      codeTemplate: "// Extract the k-th bit (0 or 1)\nint bit = (x >> k) ___1___ 1;\nint totalRows = 1 ___2___ n; // 2^n",
      blanks: [
        {
                "id": 1,
                "answer": "&",
                "hint": "Bitwise AND operator"
        },
        {
                "id": 2,
                "answer": "<<",
                "hint": "Bitwise left-shift operator"
        }
]
    }
  },
  {
    id: "28-capstone-boolean-evaluator",
    category: "Luis's Capstone Projects",
    fileSlug: "28_capstone_boolean_evaluator",
    title: "28. Capstone 3: Boolean Algebra Evaluator & Truth Tables",
    summary: "Build a validated Boolean expression evaluator, generate truth tables, and compare two expressions across every input row.",
    cBridge: "This capstone implements expression parsing—a fundamental compiler concept. We evaluate boolean formulas without external libraries using recursive substring evaluation and operator reduction.",
    content: "<h3>Build a Parser You Can Explain and Validate</h3>\n<p>Begin with a documented grammar and a short input loop. A practical first milestone accepts variables, parentheses, prefix <code>!</code>, AND (<code>&amp;</code>), and OR (<code>+</code>); add implicit AND, apostrophe NOT, XOR, and equivalence only after tests cover them. Read an entire expression with <code>std::getline</code>, treat a blank line as an error, and give <code>--i</code> or <code>quit</code> an explicit meaning. Keep parsing separate from truth-table generation and printing.</p>\n<p>For recursive descent, give each precedence level its own function, such as <code>parseOr</code>, <code>parseAnd</code>, <code>parseUnary</code>, and <code>parsePrimary</code>. A parenthesized primary parses its inner expression and requires a closing <code>)</code>. This makes precedence visible in the code and lets errors identify an unexpected token or missing parenthesis. Cap the number of variables before computing <code>2^N</code>, since truth tables grow exponentially.</p>\n<p>The original program recursively reduces substrings from the end and uses shared global operator flags. Its info text even describes a backwards association for repeated XOR; it has no robust malformed-input path. Treat that code as a feature reference, not a parser to copy. A correct evaluator should be deterministic, have stated syntax, and fail with a useful message instead of indexing outside a string.</p>\n\n<h3>The Boolean Operator Hierarchy</h3>\n<p>To evaluate complex formulas like <code>A(B + C') ^ (A &amp; !B)</code>, we must respect the standard Boolean operator precedence order:</p>\n<ol>\n  <li><strong>Parentheses <code>()</code>:</strong> Evaluated first from inside out.</li>\n  <li><strong>NOT:</strong> Postfix apostrophe <code>A'</code> or prefix exclamation <code>!A</code>.</li>\n  <li><strong>AND:</strong> Explicit <code>*</code>, <code>.</code>, <code>&amp;</code>, and implicit variable adjacency (<code>AB</code>).</li>\n  <li><strong>XOR:</strong> Caret <code>^</code> (different = 1, same = 0).</li>\n  <li><strong>OR:</strong> Plus <code>+</code> and pipe <code>|</code>.</li>\n</ol>\n\n<h3>Recursive Parenthesis Evaluation</h3>\n<p>Parentheses naturally divide an expression into smaller expressions. A recursive evaluator can locate a matched pair, evaluate the inner expression, and replace that group with <code>'0'</code> or <code>'1'</code>. Each recursive call must receive a smaller, well-formed expression; malformed input needs an explicit error rather than an assumed result:</p>\n\n<pre><code>// Example reduction:\n// &quot;A(B + C)&quot; -&gt; evaluate &quot;B + C&quot; -&gt; replace the group with its result</code></pre>\n<p>Recursion is one possible implementation, not a requirement for a good user experience. The original project uses backward substring reduction with global operator flags and does not validate unmatched parentheses, missing operands, or unsafe positions such as NOT at the start. These assumptions can produce wrong results or invalid string access. A stronger design keeps parser state local, checks each token and matched parenthesis, reports invalid input clearly, and separates reading, parsing, evaluation, and output. Teach a deliberately limited grammar and say what it supports.</p>\n\n<h3>Automated Equivalence Verification</h3>\n<p>Want to prove whether two boolean expressions are mathematically identical (e.g. De Morgan's Law: <code>(A + B)' = A'B'</code>)?</p>\n<p>Our program tests both expressions against all 2<sup>N</sup> minterm input combinations. If the output of <code>F1</code> matches <code>F2</code> for every single row, the functions are proven mathematically equivalent!</p>",
    starterCode: "// 28_capstone_boolean_evaluator.cpp\n#include <iostream>\n#include <string>\n#include <set>\n#include <map>\n#include <algorithm>\n\nnamespace BooleanLogic {\n    char evalFlat(std::string s) {\n        for (size_t i = 0; i < s.length(); ++i) {\n            if (s[i] == '\\'' && i > 0) { s[i-1] = (s[i-1]=='1')?'0':'1'; s.erase(i,1); --i; }\n            else if (s[i]=='!' && i+1<s.length()) { s[i+1]=(s[i+1]=='1')?'0':'1'; s.erase(i,1); --i; }\n        }\n        for (int i=(int)s.length()-1; i>0; --i)\n            if (s[i]=='*'||s[i]=='&'||s[i]=='.') {\n                s[i-1]=(s[i-1]=='1'&&s[i+1]=='1')?'1':'0'; s.erase(i,2);\n            } else if ((s[i]=='1'||s[i]=='0')&&(s[i-1]=='1'||s[i-1]=='0')) {\n                s[i-1]=(s[i-1]=='1'&&s[i]=='1')?'1':'0'; s.erase(i,1);\n            }\n        for (int i=(int)s.length()-1; i>0; --i)\n            if (s[i]=='^') { s[i-1]=(s[i-1]!=s[i+1])?'1':'0'; s.erase(i,2); }\n        for (int i=(int)s.length()-1; i>0; --i)\n            if (s[i]=='+'||s[i]=='|') { s[i-1]=(s[i-1]=='1'||s[i+1]=='1')?'1':'0'; s.erase(i,2); }\n        return s.empty()?'0':s[0];\n    }\n\n    char eval(std::string s) {\n        while (s.find('(')!=std::string::npos) {\n            size_t cp=s.find(')'), op=s.rfind('(',cp);\n            std::string sub=s.substr(op+1,cp-op-1);\n            char r=eval(sub); s.replace(op,cp-op+1,1,r);\n        }\n        return evalFlat(s);\n    }\n\n    std::string substitute(std::string expr, const std::string& bin, const std::map<char,int>& vm) {\n        for (size_t i=0; i<expr.length(); ++i)\n            if (std::isalpha(expr[i])) expr[i]=bin[vm.at(expr[i])];\n        return expr;\n    }\n}\n\nint main() {\n    std::cout << \"=== BOOLEAN ALGEBRA EQUIVALENCE PROVER ===\\n\\n\";\n    std::string f1=\"A(B+C)\", f2=\"AB+AC\";\n    std::cout << \"F1: \" << f1 << \"\\nF2: \" << f2 << \"\\n\\n\";\n\n    std::map<char,int> vm={{'A',0},{'B',1},{'C',2}};\n    int total = 1 << 3;\n    bool equiv = true;\n\n    std::cout << \" A B C | F1 | F2 | OK?\\n\";\n    std::cout << \"-------+----+----+----\\n\";\n\n    for (int i=0; i<total; ++i) {\n        std::string bin=\"\";\n        for (int j=2;j>=0;--j) bin+=((i>>j)&1)?'1':'0';\n        char o1=BooleanLogic::eval(BooleanLogic::substitute(f1,bin,vm));\n        char o2=BooleanLogic::eval(BooleanLogic::substitute(f2,bin,vm));\n        if (o1!=o2) equiv=false;\n        std::cout << \" \" << bin[0] << \" \" << bin[1] << \" \" << bin[2]\n                  << \" |  \" << o1 << \" |  \" << o2 << \" |  \" << (o1==o2?\"YES\":\"NO\") << \"\\n\";\n    }\n    std::cout << \"\\nResult: \" << (equiv?\"EQUIVALENT (Distributive Law)\":\"NOT EQUIVALENT\") << \"\\n\";\n    return 0;\n}",
    explanation: "Recursive parenthesis extraction reduces expressions to flat binary evaluations and proves algebraic equivalence across all minterms.",
    quiz: {
      "question": "How does the equivalence prover verify whether two boolean functions are identical?",
      "options": [
            "By comparing the length of the strings",
            "By testing both expressions on all 2^N possible binary input rows",
            "By compiling both into separate binaries and measuring runtimes",
            "By checking if both contain the letter A"
      ],
      "answer": 1,
      "explanation": "If two boolean functions yield identical truth values for every minterm in the 2^N state space, they are mathematically equivalent."
},
    fillBlank: {
      instructions: "Fill in the truth table result for XOR when inputs differ (1 ^ 0):",
      codeTemplate: "// XOR operation: different inputs yield 1\nchar xorResult = ('1' != '0') ? '___1___' : '0';\n// De Morgan's Law: (A + B)' == A' ___2___ B'",
      blanks: [
        {
                "id": 1,
                "answer": "1",
                "hint": "Output for 1 XOR 0"
        },
        {
                "id": 2,
                "answer": "*",
                "hint": "AND operator symbol"
        }
]
    }
  },
  {
    id: "29-gray-code-and-karnaugh-maps",
    category: "Luis's Capstone Projects",
    fileSlug: "29_gray_code_and_karnaugh_maps",
    title: "29. Gray Code & Karnaugh Map Fundamentals",
    summary: "Understand why binary sequence fails for Karnaugh maps and master Gray Code index permutation for 2, 3, and 4-variable logic grids.",
    cBridge: "In standard binary counting, transitioning from 01 to 10 flips two bits simultaneously. Karnaugh maps demand that physically adjacent cells differ by exactly ONE bit (Hamming distance = 1). Gray code solves this constraint, forming the topological foundation of hardware minimization.",
    content: "<h3>Why Standard Binary Fails for K-Maps</h3>\n<p>Consider standard 2-bit binary counting: <code>00 &rarr; 01 &rarr; 10 &rarr; 11</code>. Notice the jump between 1 (<code>01</code>) and 2 (<code>10</code>): <strong>both bits flipped simultaneously</strong>! If we arranged a visual logic grid this way, adjacent cells would not share common factors.</p>\n\n<h3>The Gray Code Sequence</h3>\n<p>A Gray code sequence orders binary numbers such that two successive values differ in only <strong>one</strong> bit position:</p>\n<pre><code>00  (decimal 0)\n01  (decimal 1)\n11  (decimal 3)  &lt;-- Note 11 comes before 10!\n10  (decimal 2)</code></pre>\n<p>Notice that the transition from <code>10</code> back to <code>00</code> also changes only one bit! This means Karnaugh maps wrap around horizontally and vertically like a continuous torus/donut.</p>\n\n<h3>The 4-Variable 4x4 K-Map Coordinate Map</h3>\n<p>In a 4-variable K-map (variables <code>A, B, C, D</code>), rows represent <code>AB</code> and columns represent <code>CD</code>. Both axes follow Gray code order: <code>{00, 01, 11, 10}</code>.</p>\n<table style=\"width: 100%; border-collapse: collapse; margin: 1rem 0; font-family: monospace;\">\n  <thead>\n    <tr style=\"background: rgba(30,144,255,0.15);\">\n      <th style=\"padding: 6px; border: 1px solid var(--border);\">AB  CD</th>\n      <th style=\"padding: 6px; border: 1px solid var(--border);\">00</th>\n      <th style=\"padding: 6px; border: 1px solid var(--border);\">01</th>\n      <th style=\"padding: 6px; border: 1px solid var(--border);\">11</th>\n      <th style=\"padding: 6px; border: 1px solid var(--border);\">10</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr><td style=\"padding: 6px; border: 1px solid var(--border);\"><strong>00</strong></td><td>m0</td><td>m1</td><td>m3</td><td>m2</td></tr>\n    <tr><td style=\"padding: 6px; border: 1px solid var(--border);\"><strong>01</strong></td><td>m4</td><td>m5</td><td>m7</td><td>m6</td></tr>\n    <tr><td style=\"padding: 6px; border: 1px solid var(--border);\"><strong>11</strong></td><td>m12</td><td>m13</td><td>m15</td><td>m14</td></tr>\n    <tr><td style=\"padding: 6px; border: 1px solid var(--border);\"><strong>10</strong></td><td>m8</td><td>m9</td><td>m11</td><td>m10</td></tr>\n  </tbody>\n</table>\n<p>Look closely at Luis's loops in <code>Boolean_algebra.cpp</code>:</p>\n<pre><code>for(int num : {0, 1, 3, 2}) ...\nfor(int num : {4, 5, 7, 6}) ...\nfor(int num : {12, 13, 15, 14}) ...\nfor(int num : {8, 9, 11, 10}) ...</code></pre>\n<p>This exact permutation maps truth table minterm output strings directly into physical Gray-code 2D visual grid cells!</p>",
    starterCode: "// 29_gray_code_and_karnaugh_maps.cpp\n#include <iostream>\n#include <string>\n#include <iomanip>\n\nint main() {\n    std::cout << \"=== GRAY CODE & K-MAP PERMUTATION MAPPING ===\\n\\n\";\n\n    int kmapIndices[4][4] = {\n        { 0,  1,  3,  2},\n        { 4,  5,  7,  6},\n        {12, 13, 15, 14},\n        { 8,  9, 11, 10}\n    };\n\n    std::string colLabels[] = {\"00\", \"01\", \"11\", \"10\"};\n\n    std::cout << \"     CD:  00   01   11   10\\n\";\n    std::cout << \"  AB  +---------------------\\n\";\n\n    for (int r = 0; r < 4; ++r) {\n        std::cout << \"  \" << colLabels[r] << \"  | \";\n        for (int c = 0; c < 4; ++c)\n            std::cout << std::setw(3) << \"m\" + std::to_string(kmapIndices[r][c]) << \" \";\n        std::cout << \"\\n\";\n    }\n\n    std::cout << \"\\nGray code adjacency (each step flips exactly 1 bit):\\n\";\n    std::cout << \"m0(0000)->m1(0001) [D], m1->m3(0011) [C], m3->m2(0010) [D], m2->m0 [C]\\n\";\n    return 0;\n}",
    explanation: "Gray code ensures physical adjacency equals logical adjacency of minterms with a Hamming distance of 1.",
    quiz: {
      "question": "Why is the 2-bit Gray code order 00, 01, 11, 10 instead of 00, 01, 10, 11?",
      "options": [
            "Because 11 is smaller than 10 in hexadecimal",
            "So that each consecutive step changes only a single bit (Hamming distance 1)",
            "Because C++ arrays require odd numbers first",
            "To make the truth table shorter"
      ],
      "answer": 1,
      "explanation": "Going from 01 directly to 10 changes two bits at once. Inserting 11 ensures exactly one bit changes per adjacent step."
},
    fillBlank: {
      instructions: "Fill in the Gray-code index order for the third row (11) of a 4-variable K-map:",
      codeTemplate: "// Row 3 indices for Gray code 11 (AB):\nint row3[4] = {12, ___1___, 15, ___2___};",
      blanks: [
        {
                "id": 1,
                "answer": "13",
                "hint": "1101 in decimal"
        },
        {
                "id": 2,
                "answer": "14",
                "hint": "1110 in decimal"
        }
]
    }
  },
  {
    id: "30-capstone-kmap-visualizer",
    category: "Luis's Capstone Projects",
    fileSlug: "30_capstone_kmap_visualizer",
    title: "30. Capstone 4: Interactive Karnaugh Map (K-Map) Visualizer",
    summary: "Extend a validated Boolean evaluator into a terminal K-map visualizer using Gray-code cell ordering.",
    cBridge: "This final capstone synthesizes everything learned across the entire course: STL sets, maps, vectors, bit manipulation, recursive parsing, Gray-code indexing, and ANSI 24-bit TrueColor console rendering into an impressive, professional engineering tool.",
    content: "<h3>Turn the Truth Table into a K-Map</h3>\n<p>Use the evaluator from Lesson 28 to produce a complete truth string, then map each minterm to its Gray-code row and column using the index table from Lesson 29. Validate the variable count and require exactly <code>2^N</code> truth values before drawing. Keep the renderer independent from evaluation so plain text output can be used when ANSI colors are unavailable.</p>\n<p>Build in stages: first render a 2-variable map without color, then add Gray-code ordering, then 3- and 4-variable layouts, and finally optional ANSI cell styling and identity comparison. The current starter code is a fixed 4-variable demonstration; it does not parse expressions, accept a bitstream, or verify the claimed simplification. Those are extension tasks, not features already implemented.</p>\n\n<h3>The Crowning Capstone: The K-Map Visualizer</h3>\n<p>You have reached the ultimate capstone of the curriculum! We now synthesize all the concepts mastered across earlier lessons into a unified digital logic workstation:</p>\n<ul>\n  <li><strong>Expression Parsing:</strong> Recursively reduces formulas with parentheses, NOT, AND, XOR, and OR.</li>\n  <li><strong>Truth Table Generation:</strong> Automatically discovers all input variables and tabulates all 2<sup>N</sup> combinations.</li>\n  <li><strong>ANSI Visual 2D K-Map Grid:</strong> Renders high-contrast colored blocks for <code>1</code> (white active cell), <code>0</code> (dark background), and <code>?</code> (don't care condition).</li>\n  <li><strong>Complement Headers:</strong> Renders visual boundary lines showing which rows/columns correspond to uncomplemented vs complemented variable regions.</li>\n</ul>\n\n<h3>Karnaugh Map Cell Visual Styling</h3>\n<p>In our console renderer, every cell in the K-map is drawn with high-visibility TrueColor background styling:</p>\n<ul>\n  <li><code>1 (True):</code> <code>\\x1b[48;2;240;248;255;38;2;10;10;10;1m  1  \\x1b[0m</code> &mdash; Vibrant illuminated cell.</li>\n  <li><code>0 (False):</code> <code>\\x1b[48;2;25;30;40;38;2;140;150;165m  0  \\x1b[0m</code> &mdash; Dark contrast cell.</li>\n</ul>\n<p>Adjacent groups of 1s in sizes of powers of two (2, 4, 8, 16) represent simplified product terms in digital logic minimization.</p>",
    starterCode: "// 30_capstone_kmap_visualizer.cpp\n#include <iostream>\n#include <vector>\n#include <string>\n\nstd::string kCell(char val) {\n    if (val == '1') return \"\\033[48;2;240;248;255;38;2;10;10;10;1m  1  \\033[0m\";\n    if (val == '0') return \"\\033[48;2;25;30;40;38;2;140;150;165m  0  \\033[0m\";\n    return \"\\033[48;2;80;85;95;38;2;240;240;240m  ?  \\033[0m\";\n}\n\nvoid printKMap4(const std::string& truth, const std::vector<char>& v) {\n    int map[4][4] = {{0,1,3,2},{4,5,7,6},{12,13,15,14},{8,9,11,10}};\n    std::string rl[] = {\"00\",\"01\",\"11\",\"10\"};\n\n    std::cout << \"\\n\\033[38;2;100;220;255;1mK-Map (\" << v[0] << v[1]\n              << \" \\\\ \" << v[2] << v[3] << \")\\033[0m\\n\\n\";\n    std::cout << \"       \" << v[2] << v[3] << \": 00    01    11    10\\n\";\n    std::cout << \"   \" << v[0] << v[1] << \" +--------------------------\\n\";\n\n    for (int r = 0; r < 4; ++r) {\n        std::cout << \"    \" << rl[r] << \" | \";\n        for (int c = 0; c < 4; ++c) {\n            int idx = map[r][c];\n            char bit = (idx < (int)truth.size()) ? truth[idx] : '0';\n            std::cout << kCell(bit) << \" \";\n        }\n        std::cout << \"\\n\";\n    }\n    std::cout << std::endl;\n}\n\nint main() {\n    std::cout << \"\\033[38;2;100;220;255;1m\"\n              << \"=== KARNAUGH MAP (K-MAP) VISUALIZER ===\\n\\033[0m\";\n\n    // F = D (all odd minterms are 1)\n    std::string truth = \"0101010101010101\";\n    std::vector<char> vars = {'A','B','C','D'};\n\n    std::cout << \"Bitstream: \" << truth << \"\\n\";\n    std::cout << \"Active minterms: m1,m3,m5,m7,m9,m11,m13,m15\\n\";\n\n    printKMap4(truth, vars);\n\n    std::cout << \"\\033[38;2;255;215;0;1mSimplification: F = D\\033[0m\\n\";\n    std::cout << \"(Column 01 and 11 form an 8-cell octet - A, B, C cancel)\\n\";\n    return 0;\n}",
    explanation: "This complete capstone brings together 2D Gray code indexing, ANSI TrueColor block rendering, and logic minimization.",
    quiz: {
      "question": "In a 4-variable K-map, what does a single connected group of 8 adjacent 1-cells simplify to?",
      "options": [
            "A single literal variable",
            "A 3-variable term",
            "A 4-variable term",
            "It cannot be simplified"
      ],
      "answer": 0,
      "explanation": "Each doubling in group size eliminates one variable. A group of 8 (2^3) in a 4-variable map eliminates 3 variables, leaving a single literal."
},
    fillBlank: {
      instructions: "Fill in the group sizes that can be legally circled in a Karnaugh map (must be powers of 2):",
      codeTemplate: "// Valid K-map grouping sizes:\nint validSizes[] = {1, 2, 4, ___1___, ___2___};",
      blanks: [
        {
                "id": 1,
                "answer": "8",
                "hint": "2 to the 3rd power"
        },
        {
                "id": 2,
                "answer": "16",
                "hint": "2 to the 4th power"
        }
]
    }
  },

  // ─── NEW LESSONS ─────────────────────────────────────────────────────────────

  {
    id: "31-constants-and-type-casting",
    category: "Foundations Extended",
    fileSlug: "31_constants_and_casting",
    title: "31. Constants & Type Casting",
    summary: "Use const to lock values, and cast between numeric types cleanly with static_cast.",
    cBridge: "In C you used #define PI 3.14159 for constants — a raw text substitution with no type safety. In C++, const int MAX = 100; gives a typed, scoped constant that the compiler can reason about. static_cast<double>(x) replaces the old C-style (double)x cast.",
    content: "\n<h3>The <code>const</code> Keyword</h3>\n<p>Marking a variable <code>const</code> prevents it from ever being reassigned. Attempting to modify it is a compile-time error. By convention, constant names use <code>UPPER_SNAKE_CASE</code>.</p>\n\n<pre><code>const double PI = 3.14159265;\nconst int SCREEN_WIDTH = 1920;\n// PI = 3.0; // ❌ Compile error</code></pre>\n\n<h3>Type Casting with <code>static_cast</code></h3>\n<p>C++ provides named cast operators that are explicit and searchable. <code>static_cast&lt;T&gt;(expr)</code> is the standard way to convert between compatible numeric types:</p>\n\n<pre><code>int votes = 7;\nint total = 10;\n// Integer division — loses the decimal:\ndouble ratio = votes / total;       // 0.0\n// Correct — cast one operand first:\ndouble ratio2 = static_cast&lt;double&gt;(votes) / total; // 0.7</code></pre>\n\n<h3>Narrowing Conversions</h3>\n<p>Casting from a larger type to a smaller one (e.g. <code>double</code> to <code>int</code>) truncates toward zero — it does not round. Always be deliberate:</p>\n<pre><code>double price = 9.99;\nint wholePrice = static_cast&lt;int&gt;(price); // 9, not 10</code></pre>",
    starterCode: "// 31_constants_and_casting.cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    const double PI = 3.14159265;\n    const int BIRTH_YEAR = 1990;\n\n    cout << \"PI = \" << PI << endl;\n    cout << \"Birth year: \" << BIRTH_YEAR << endl;\n\n    // Casting to avoid integer division\n    int correct = 9;\n    int total = 10;\n    double pct = static_cast<double>(correct) / total * 100.0;\n    cout << \"Score: \" << pct << \"%\" << endl;\n\n    // Narrowing cast\n    double temperature = 36.8;\n    int truncated = static_cast<int>(temperature);\n    cout << \"Truncated temp: \" << truncated << endl;\n\n    return 0;\n}",
    explanation: "static_cast is checked at compile time, making it safer than a C-style (int) cast which silently compiles even on incompatible types.",
    quiz: {
      "question": "What does static_cast<int>(7.9) return?",
      "options": [
            "8",
            "7",
            "8.0",
            "Compile error"
      ],
      "answer": 1,
      "explanation": "static_cast<int> truncates toward zero, so 7.9 becomes 7, not 8."
    },
    fillBlank: {
      instructions: "Fill in the keyword and cast to compute a percentage without integer division:",
      codeTemplate: "#include <iostream>\nusing namespace std;\n\nint main() {\n    ___1___ int TOTAL = 50;\n    int got = 35;\n    double pct = ___2___<double>(got) / TOTAL * 100.0;\n    cout << pct << \"%\" << endl;\n    return 0;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "const",
                "hint": "Keyword to declare an immutable variable"
        },
        {
                "id": 2,
                "answer": "static_cast",
                "hint": "C++ named cast operator"
        }
]
    }
  },
  {
    id: "32-constants-input-program",
    category: "Foundations Extended",
    fileSlug: "32_bmi_calculator",
    title: "32. Interactive BMI Calculator",
    summary: "Build a full BMI calculator that accepts user input, uses const for medical thresholds, and branches with if-else.",
    cBridge: "This program combines three pillars at once: stdin reading (cin), constant named thresholds (const double), and conditional output. In a C program you would use #define thresholds and scanf; in C++ the equivalent is far more readable.",
    content: "\n<h3>Putting It Together: A Real Interactive Program</h3>\n<p>The best way to solidify constants, casting, and input is to build something useful. BMI (Body Mass Index) is calculated as:</p>\n\n<pre><code>BMI = weight_kg / (height_m * height_m)</code></pre>\n\n<p>We define the medical category thresholds as <code>const</code> values so they can never be accidentally mutated, then read real user input and classify the result.</p>\n\n<h3>The <code>cin.ignore()</code> Reminder</h3>\n<p>After reading a numeric value with <code>cin &gt;&gt; weight</code>, a newline <code>'\\n'</code> remains in the buffer. If a <code>getline()</code> call follows, it will consume that newline immediately and appear to skip input. Always call <code>cin.ignore();</code> between a <code>cin &gt;&gt;</code> and a <code>getline()</code>.</p>",
    starterCode: "// 32_bmi_calculator.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    const double UNDERWEIGHT = 18.5;\n    const double NORMAL_MAX  = 24.9;\n    const double OVERWEIGHT_MAX = 29.9;\n\n    string name;\n    double weight, height;\n\n    cout << \"Enter your name: \";\n    getline(cin, name);\n\n    cout << \"Enter weight in kg: \";\n    cin >> weight;\n\n    cout << \"Enter height in metres: \";\n    cin >> height;\n\n    double bmi = weight / (height * height);\n\n    cout << \"\\nHello, \" << name << \"!\" << endl;\n    cout << \"Your BMI is: \" << bmi << endl;\n\n    if (bmi < UNDERWEIGHT) {\n        cout << \"Category: Underweight\" << endl;\n    } else if (bmi <= NORMAL_MAX) {\n        cout << \"Category: Normal weight\" << endl;\n    } else if (bmi <= OVERWEIGHT_MAX) {\n        cout << \"Category: Overweight\" << endl;\n    } else {\n        cout << \"Category: Obese\" << endl;\n    }\n\n    return 0;\n}",
    explanation: "Try entering name=Alice, weight=65, height=1.70. The BMI comes out to ~22.5, which falls in the Normal range.",
    quiz: {
      "question": "Why is it safer to store the BMI threshold 18.5 as 'const double UNDERWEIGHT = 18.5' rather than writing 18.5 directly in the if-condition?",
      "options": [
            "Constants run faster at runtime",
            "It gives the magic number a name, prevents accidental mutation, and makes future changes require only one edit",
            "The compiler cannot evaluate 18.5 directly in an if-condition",
            "const is required for floating-point comparisons"
      ],
      "answer": 1,
      "explanation": "Named constants eliminate 'magic numbers', making code self-documenting and ensuring any threshold update propagates everywhere automatically."
    },
    fillBlank: {
      instructions: "Complete the BMI formula and the getline call to read the user's name:",
      codeTemplate: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name;\n    double w, h;\n    ___1___(cin, name);\n    cin >> w >> h;\n    double bmi = w / (h ___2___ h);\n    cout << bmi << endl;\n    return 0;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "getline",
                "hint": "Function to read a full line including spaces"
        },
        {
                "id": 2,
                "answer": "*",
                "hint": "Operator to multiply height by itself"
        }
]
    }
  },
  {
    id: "33-string-comparison-and-methods",
    category: "Foundations Extended",
    fileSlug: "33_string_comparison",
    title: "33. String Comparison & Advanced Methods",
    summary: "Compare strings with == and .compare(), convert case, and check membership with .find().",
    cBridge: "In C, strcmp(a, b) returned 0 for equality, negative if a < b, and positive if a > b. In C++, you can compare std::string objects directly with == and !=. The .compare() method still exists for ordering comparisons.",
    content: "\n<h3>Direct Equality Comparison</h3>\n<p>Unlike C-strings (char arrays), <code>std::string</code> objects support direct equality comparisons with <code>==</code> and <code>!=</code>:</p>\n\n<pre><code>string password = \"s3cr3t\";\nstring attempt;\ncin >> attempt;\n\nif (attempt == password) {\n    cout << \"Access granted!\" << endl;\n} else {\n    cout << \"Wrong password.\" << endl;\n}</code></pre>\n\n<h3>Ordering with <code>.compare()</code></h3>\n<p><code>a.compare(b)</code> returns <code>0</code> if equal, a negative number if <code>a</code> comes before <code>b</code> alphabetically, or a positive number if after. This is directly equivalent to C's <code>strcmp</code>:</p>\n<pre><code>if (myString.compare(\"cat\") == 0) {\n    cout << \"Strings are equal\" << endl;\n}</code></pre>\n\n<h3>Case Conversion</h3>\n<p>The standard library provides <code>toupper(c)</code> and <code>tolower(c)</code> from <code>&lt;cctype&gt;</code>. To convert a whole string, loop over each character:</p>\n<pre><code>#include &lt;cctype&gt;\nfor (char& c : word) c = toupper(c);</code></pre>",
    starterCode: "// 33_string_comparison.cpp\n#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\n\nint main() {\n    string secret = \"cpp2026\";\n    string attempt;\n\n    cout << \"Enter the password: \";\n    cin >> attempt;\n\n    if (attempt == secret) {\n        cout << \"Access granted! Welcome.\" << endl;\n    } else {\n        cout << \"Incorrect. You entered: \" << attempt << endl;\n    }\n\n    // Alphabetic ordering\n    string word;\n    cout << \"Enter a word to classify: \";\n    cin >> word;\n\n    // Convert to lowercase for comparison\n    string lower = word;\n    for (char& c : lower) c = tolower(c);\n\n    if (lower.compare(\"mango\") < 0) {\n        cout << word << \" comes before 'mango' alphabetically\" << endl;\n    } else if (lower.compare(\"mango\") == 0) {\n        cout << word << \" equals 'mango'\" << endl;\n    } else {\n        cout << word << \" comes after 'mango' alphabetically\" << endl;\n    }\n\n    return 0;\n}",
    explanation: "Try password 'cpp2026' for access, then a word like 'apple' (before mango) or 'zebra' (after). The range-based for loop 'for (char& c : lower)' iterates every character by reference.",
    quiz: {
      "question": "What does myStr.compare(\"hello\") return when myStr == \"hello\"?",
      "options": [
            "true",
            "1",
            "0",
            "-1"
      ],
      "answer": 2,
      "explanation": "compare() returns 0 when the strings are equal, mirroring C's strcmp() return value convention."
    },
    fillBlank: {
      instructions: "Fill in the comparison operator and case conversion function:",
      codeTemplate: "#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\n\nint main() {\n    string s = \"Hello\";\n    for (char& c : s) c = ___1___(c);\n    if (s ___2___ \"hello\") cout << \"match\" << endl;\n    return 0;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "tolower",
                "hint": "Function from <cctype> that converts a char to lowercase"
        },
        {
                "id": 2,
                "answer": "==",
                "hint": "Equality comparison operator for std::string"
        }
]
    }
  },
  {
    id: "34-pass-by-value-vs-reference",
    category: "Foundations Extended",
    fileSlug: "34_pass_by_reference",
    title: "34. Pass-by-Value vs Pass-by-Reference",
    summary: "Understand why functions receive copies by default, when to use & to pass by reference, and how to write a proper swap function.",
    cBridge: "In C, in-place mutation required passing pointers (void swap(int *a, int *b)) and dereferencing with *a and *b. C++ introduces references: void swap(int& a, int& b) achieves the same result with cleaner syntax — no ampersand at call site, no dereference asterisk inside.",
    content: "\n<h3>Pass-by-Value (Default)</h3>\n<p>By default, function parameters in C++ are <em>copies</em> of the arguments. Mutations inside the function do not affect the original variable:</p>\n\n<pre><code>void doubleIt(int n) {\n    n = n * 2; // Only modifies the LOCAL copy\n}\n\nint x = 5;\ndoubleIt(x);\ncout << x; // Still 5</code></pre>\n\n<h3>Pass-by-Reference with <code>&amp;</code></h3>\n<p>Adding <code>&amp;</code> to the parameter type makes the parameter an <em>alias</em> — it refers directly to the caller's variable. Any change is permanent:</p>\n\n<pre><code>void doubleIt(int& n) {\n    n = n * 2; // Modifies the ORIGINAL\n}\n\nint x = 5;\ndoubleIt(x);\ncout << x; // 10</code></pre>\n\n<h3>Classic Swap with References</h3>\n<pre><code>void swap(int& a, int& b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}</code></pre>",
    starterCode: "// 34_pass_by_reference.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\n// Pass by value — caller's variable is unchanged\nvoid attemptDouble(int n) {\n    n *= 2;\n    cout << \"Inside attemptDouble: n = \" << n << endl;\n}\n\n// Pass by reference — directly mutates the caller's variable\nvoid actualDouble(int& n) {\n    n *= 2;\n}\n\n// Swap two strings by reference\nvoid swapStrings(string& a, string& b) {\n    string temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int score = 10;\n    attemptDouble(score);\n    cout << \"After attemptDouble: score = \" << score << \" (unchanged)\" << endl;\n\n    actualDouble(score);\n    cout << \"After actualDouble:  score = \" << score << \" (doubled)\" << endl;\n\n    string city1 = \"Lagos\";\n    string city2 = \"Abuja\";\n    cout << \"Before swap: \" << city1 << \" | \" << city2 << endl;\n    swapStrings(city1, city2);\n    cout << \"After swap:  \" << city1 << \" | \" << city2 << endl;\n\n    return 0;\n}",
    explanation: "Notice that calling attemptDouble(score) leaves score unchanged because the function receives a copy. actualDouble(score) uses int& and modifies the original.",
    quiz: {
      "question": "What is the output of the following code?\nvoid add(int x) { x += 100; }\nint n = 5; add(n); cout << n;",
      "options": [
            "105",
            "5",
            "100",
            "Compile error"
      ],
      "answer": 1,
      "explanation": "x is a copy. The original n is never changed, so the output is 5."
    },
    fillBlank: {
      instructions: "Make this function modify the caller's variable by using a reference parameter:",
      codeTemplate: "#include <iostream>\nusing namespace std;\n\nvoid reset(int ___1___ val) {\n    val = 0;\n}\n\nint main() {\n    int score = 42;\n    reset(___2___);\n    cout << score << endl; // should print 0\n    return 0;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "&",
                "hint": "Reference operator placed after the type"
        },
        {
                "id": 2,
                "answer": "score",
                "hint": "The variable to pass by reference"
        }
]
    }
  },
  {
    id: "35-exception-handling",
    category: "Foundations Extended",
    fileSlug: "35_exception_handling",
    title: "35. Exception Handling (try / catch / throw)",
    summary: "Detect and recover from runtime errors using try blocks, catch handlers, and thrown exceptions.",
    cBridge: "C had no exception mechanism. Errors were signalled by return codes (if (result == -1) handle_error()). C++ introduces first-class exceptions: throw any value from deep inside a call stack, and the nearest matching catch block up the call chain will handle it — no manual error propagation.",
    content: "\n<h3>The try-catch Pattern</h3>\n<p>Wrap code that might fail inside a <code>try</code> block. If a <code>throw</code> statement executes, control immediately jumps to the corresponding <code>catch</code> block:</p>\n\n<pre><code>try {\n    // Risky code\n    if (divisor == 0) throw \"Cannot divide by zero!\";\n    cout << numerator / divisor;\n} catch (const char* message) {\n    cout << \"Error: \" << message << endl;\n}</code></pre>\n\n<h3>Throwing and Catching Different Types</h3>\n<p>You can throw any value — a string literal (<code>const char*</code>), an integer error code, or a standard exception object from <code>&lt;stdexcept&gt;</code>:</p>\n\n<pre><code>#include &lt;stdexcept&gt;\nthrow runtime_error(\"File not found\");\n\n} catch (const runtime_error& e) {\n    cout << e.what() << endl;\n}</code></pre>\n\n<h3>Multiple catch Blocks</h3>\n<p>A single <code>try</code> block can have multiple <code>catch</code> clauses, each matching a different thrown type. A catch-all clause <code>catch (...)</code> matches anything:</p>\n<pre><code>catch (int errorCode) { ... }\ncatch (const string& msg) { ... }\ncatch (...) { cout << \"Unknown error\"; }</code></pre>",
    starterCode: "// 35_exception_handling.cpp\n#include <iostream>\n#include <string>\n#include <stdexcept>\nusing namespace std;\n\ndouble safeDivide(double a, double b) {\n    if (b == 0.0) {\n        throw runtime_error(\"Division by zero is undefined!\");\n    }\n    return a / b;\n}\n\nint parsePositive(int n) {\n    if (n < 0) throw invalid_argument(\"Number must be positive.\");\n    return n;\n}\n\nint main() {\n    // Test 1: Division by zero\n    try {\n        cout << safeDivide(10.0, 2.0) << endl;\n        cout << safeDivide(10.0, 0.0) << endl; // This throws\n    } catch (const runtime_error& e) {\n        cout << \"Caught runtime_error: \" << e.what() << endl;\n    }\n\n    // Test 2: Invalid argument\n    try {\n        cout << parsePositive(42) << endl;\n        cout << parsePositive(-5) << endl; // This throws\n    } catch (const invalid_argument& e) {\n        cout << \"Caught invalid_argument: \" << e.what() << endl;\n    }\n\n    cout << \"Program continues after exceptions.\" << endl;\n    return 0;\n}",
    explanation: "Notice that after a catch block handles the exception, program execution continues normally after the entire try-catch structure — the program does not crash.",
    quiz: {
      "question": "What happens to code in a try block that appears AFTER a throw statement executes?",
      "options": [
            "It executes normally",
            "It is skipped — control jumps immediately to the matching catch block",
            "It causes a double-throw compile error",
            "It executes only if the exception was a runtime_error"
      ],
      "answer": 1,
      "explanation": "A throw immediately transfers control out of the try block. Any remaining lines in that block are skipped."
    },
    fillBlank: {
      instructions: "Fill in the keywords to complete a safe divide function with exception handling:",
      codeTemplate: "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\ndouble safe(double a, double b) {\n    if (b == 0) ___1___ runtime_error(\"zero!\");\n    return a / b;\n}\n\nint main() {\n    ___2___ {\n        cout << safe(9, 0);\n    } catch (const runtime_error& e) {\n        cout << e.what();\n    }\n}",
      blanks: [
        {
                "id": 1,
                "answer": "throw",
                "hint": "Keyword that signals an error condition"
        },
        {
                "id": 2,
                "answer": "try",
                "hint": "Block that wraps potentially-throwing code"
        }
]
    }
  },
  {
    id: "36-input-grade-calculator",
    category: "Foundations Extended",
    fileSlug: "36_grade_calculator",
    title: "36. Interactive Grade Calculator with Exception Handling",
    summary: "Read multiple exam scores from the user, compute an average, and map it to a letter grade using switch — with exception handling for invalid input.",
    cBridge: "This lesson builds a real-world input loop: reading N values from cin, accumulating them in a sum, computing an average, then using a switch on an integer bracket to produce a letter grade — the same pattern you'd use in a C console program, now enriched with exceptions.",
    content: "\n<h3>Combining cin Loops with Exceptions</h3>\n<p>Real programs often need to validate user input. The pattern is: read inside a loop, validate inside a <code>try</code> block, and let the <code>catch</code> handle bad values gracefully:</p>\n\n<pre><code>for (int i = 0; i &lt; n; i++) {\n    int score;\n    cin &gt;&gt; score;\n    if (score &lt; 0 || score &gt; 100)\n        throw out_of_range(\"Score out of range\");\n    sum += score;\n}</code></pre>\n\n<h3>Mapping Average to Letter Grade via switch</h3>\n<p>Integer division lets us bucket a percentage into a letter grade. Dividing by 10 gives a bucket number (9 = 90s, 8 = 80s, etc.):</p>\n\n<pre><code>switch (static_cast&lt;int&gt;(avg) / 10) {\n    case 10:\n    case 9:  cout &lt;&lt; \"A\"; break;\n    case 8:  cout &lt;&lt; \"B\"; break;\n    case 7:  cout &lt;&lt; \"C\"; break;\n    case 6:  cout &lt;&lt; \"D\"; break;\n    default: cout &lt;&lt; \"F\";\n}</code></pre>",
    starterCode: "// 36_grade_calculator.cpp\n#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nchar letterGrade(double avg) {\n    switch (static_cast<int>(avg) / 10) {\n        case 10:\n        case 9:  return 'A';\n        case 8:  return 'B';\n        case 7:  return 'C';\n        case 6:  return 'D';\n        default: return 'F';\n    }\n}\n\nint main() {\n    int n;\n    cout << \"How many scores? \";\n    cin >> n;\n\n    double sum = 0.0;\n\n    try {\n        for (int i = 1; i <= n; i++) {\n            int score;\n            cout << \"Score \" << i << \": \";\n            cin >> score;\n\n            if (score < 0 || score > 100) {\n                throw out_of_range(\"Score must be between 0 and 100.\");\n            }\n            sum += score;\n        }\n\n        double avg = sum / n;\n        cout << \"\\nAverage: \" << avg << endl;\n        cout << \"Letter grade: \" << letterGrade(avg) << endl;\n\n    } catch (const out_of_range& e) {\n        cout << \"Error: \" << e.what() << endl;\n    }\n\n    return 0;\n}",
    explanation: "Try entering 3 scores: 85, 92, 77. Average = 84.67, grade = B. Then try a score of 150 to trigger the exception.",
    quiz: {
      "question": "For an average of 73.5, what does static_cast<int>(73.5) / 10 evaluate to, and what grade does that produce?",
      "options": [
            "7, grade C",
            "7, grade D",
            "6, grade D",
            "8, grade B"
      ],
      "answer": 0,
      "explanation": "static_cast<int>(73.5) = 73. 73 / 10 = 7 (integer division). Switch case 7 returns 'C'."
    },
    fillBlank: {
      instructions: "Fill in the cast and the exception type for an out-of-bounds score check:",
      codeTemplate: "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nint main() {\n    int score;\n    cin >> score;\n    try {\n        if (score < 0 || score > 100)\n            throw ___1___(\"Score invalid!\");\n        double pct = ___2___<double>(score);\n        cout << pct << endl;\n    } catch (const out_of_range& e) {\n        cout << e.what();\n    }\n}",
      blanks: [
        {
                "id": 1,
                "answer": "out_of_range",
                "hint": "Standard exception for values outside a valid range"
        },
        {
                "id": 2,
                "answer": "static_cast",
                "hint": "C++ named cast operator"
        }
]
    }
  },
  {
    id: "37-virtual-functions-and-polymorphism",
    category: "Object-Oriented Extended",
    fileSlug: "37_virtual_functions",
    title: "37. Virtual Functions & Polymorphism",
    summary: "Define a base class interface with virtual methods, override them in derived classes, and call the right implementation through a base pointer at runtime.",
    cBridge: "C has no native polymorphism mechanism. Engineers simulated it using function pointers in structs (struct Shape { void (*draw)(void); }). C++ builds this into the language with the virtual keyword. The compiler maintains a vtable (virtual dispatch table) so the correct method version is called at runtime even through a base pointer.",
    content: "\n<h3>The Problem Without <code>virtual</code></h3>\n<p>Without <code>virtual</code>, calling a method through a base class pointer always calls the <em>base class</em> version, even if the object is a derived type:</p>\n\n<pre><code>class Shape { public: void draw() { cout &lt;&lt; \"Drawing shape\"; } };\nclass Circle : public Shape { public: void draw() { cout &lt;&lt; \"Drawing circle\"; } };\n\nShape* s = new Circle();\ns->draw(); // \"Drawing shape\" — Wrong!</code></pre>\n\n<h3>Fixing It with <code>virtual</code></h3>\n<p>Marking the base method <code>virtual</code> enables <em>dynamic dispatch</em> — the correct derived version is called:</p>\n\n<pre><code>class Shape { public: virtual void draw() { cout &lt;&lt; \"Drawing shape\"; } };\nShape* s = new Circle();\ns->draw(); // \"Drawing circle\" — Correct!</code></pre>\n\n<h3>Pure Virtual Functions (Abstract Classes)</h3>\n<p>Setting a virtual method to <code>= 0</code> makes it <em>pure virtual</em>. The base class becomes <strong>abstract</strong> — it cannot be instantiated directly, only used as an interface contract that derived classes must fulfill:</p>\n\n<pre><code>class Shape {\npublic:\n    virtual void draw() = 0;  // Pure virtual\n    virtual double area() = 0;\n};</code></pre>",
    starterCode: "// 37_virtual_functions.cpp\n#include <iostream>\n#include <cmath>\nusing namespace std;\n\n// Abstract base class\nclass Shape {\npublic:\n    virtual void describe() = 0;    // Pure virtual\n    virtual double area() = 0;      // Pure virtual\n    void printInfo() {              // Non-virtual: same for all shapes\n        cout << \"Shape -> \";\n        describe();\n        cout << \"Area: \" << area() << endl;\n    }\n};\n\nclass Circle : public Shape {\n    double radius;\npublic:\n    Circle(double r) : radius(r) {}\n    void describe() override { cout << \"Circle (r=\" << radius << \")\" << endl; }\n    double area() override { return 3.14159 * radius * radius; }\n};\n\nclass Rectangle : public Shape {\n    double width, height;\npublic:\n    Rectangle(double w, double h) : width(w), height(h) {}\n    void describe() override { cout << \"Rectangle (\" << width << \"x\" << height << \")\" << endl; }\n    double area() override { return width * height; }\n};\n\nclass Triangle : public Shape {\n    double base, ht;\npublic:\n    Triangle(double b, double h) : base(b), ht(h) {}\n    void describe() override { cout << \"Triangle (b=\" << base << \", h=\" << ht << \")\" << endl; }\n    double area() override { return 0.5 * base * ht; }\n};\n\nint main() {\n    // Polymorphic array of base pointers\n    Shape* shapes[3];\n    shapes[0] = new Circle(5.0);\n    shapes[1] = new Rectangle(4.0, 6.0);\n    shapes[2] = new Triangle(3.0, 8.0);\n\n    for (int i = 0; i < 3; i++) {\n        shapes[i]->printInfo();\n    }\n\n    // Clean up\n    for (int i = 0; i < 3; i++) delete shapes[i];\n    return 0;\n}",
    explanation: "printInfo() calls describe() and area() through virtual dispatch. Even though the pointer type is Shape*, the runtime calls the correct Circle::area(), Rectangle::area(), etc.",
    quiz: {
      "question": "What does marking a virtual function = 0 mean?",
      "options": [
            "The function always returns zero",
            "The function is deleted and cannot be called",
            "The function is pure virtual: derived classes must override it and the base class cannot be instantiated",
            "It is equivalent to writing virtual void f() {}"
      ],
      "answer": 2,
      "explanation": "= 0 makes the function pure virtual. Any class with at least one pure virtual function is abstract — you cannot create an object of it directly."
    },
    fillBlank: {
      instructions: "Fill in the keywords to declare an abstract base class with a pure virtual method:",
      codeTemplate: "class Animal {\npublic:\n    ___1___ void speak() ___2___;\n};\n\nclass Dog : public Animal {\npublic:\n    void speak() override { cout << \"Woof\"; }\n};",
      blanks: [
        {
                "id": 1,
                "answer": "virtual",
                "hint": "Keyword enabling dynamic dispatch"
        },
        {
                "id": 2,
                "answer": "= 0",
                "hint": "Syntax that makes a virtual function pure"
        }
]
    }
  },
  {
    id: "38-interactive-oop-program",
    category: "Object-Oriented Extended",
    fileSlug: "38_bank_account",
    title: "38. Interactive Bank Account (OOP + Input)",
    summary: "Build a fully interactive console bank account system: deposit, withdraw, and check balance using classes, constructors, getters, and a menu-driven input loop.",
    cBridge: "This lesson merges OOP from the class lessons with user-input loops from the cin lessons. In C you would represent an account as a struct with separate functions; in C++ the account is a class that encapsulates its own data and behaviour.",
    content: "\n<h3>Designing the BankAccount Class</h3>\n<p>We encapsulate a balance as a <code>private</code> member and expose it only through controlled public methods. Deposits increase the balance; withdrawals validate sufficient funds before deducting:</p>\n\n<pre><code>class BankAccount {\n    string owner;\n    double balance;\npublic:\n    BankAccount(string name, double initial)\n        : owner(name), balance(initial) {}\n\n    void deposit(double amount) { balance += amount; }\n    bool withdraw(double amount) {\n        if (amount > balance) return false;\n        balance -= amount;\n        return true;\n    }\n    double getBalance() const { return balance; }\n};</code></pre>\n\n<h3>Menu-Driven Input Loop</h3>\n<p>A <code>do-while</code> loop is ideal for menus: the body always runs at least once, showing the menu before checking whether the user chose to quit:</p>\n\n<pre><code>int choice;\ndo {\n    cout &lt;&lt; \"1. Deposit  2. Withdraw  3. Balance  0. Exit\\n\";\n    cin &gt;&gt; choice;\n    // handle choice ...\n} while (choice != 0);</code></pre>",
    starterCode: "// 38_bank_account.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nclass BankAccount {\n    string owner;\n    double balance;\npublic:\n    BankAccount(string name, double initial)\n        : owner(name), balance(initial) {}\n\n    void deposit(double amount) {\n        if (amount <= 0) { cout << \"Deposit must be positive.\" << endl; return; }\n        balance += amount;\n        cout << \"Deposited $\" << amount << \". New balance: $\" << balance << endl;\n    }\n\n    void withdraw(double amount) {\n        if (amount <= 0)       { cout << \"Withdrawal must be positive.\" << endl; return; }\n        if (amount > balance)  { cout << \"Insufficient funds.\" << endl; return; }\n        balance -= amount;\n        cout << \"Withdrew $\" << amount << \". Remaining: $\" << balance << endl;\n    }\n\n    void checkBalance() const {\n        cout << owner << \"'s balance: $\" << balance << endl;\n    }\n\n    string getOwner() const { return owner; }\n};\n\nint main() {\n    string name;\n    double opening;\n\n    cout << \"Account holder name: \";\n    getline(cin, name);\n    cout << \"Opening deposit ($): \";\n    cin >> opening;\n\n    BankAccount acct(name, opening);\n    cout << \"\\nAccount created for \" << acct.getOwner() << \"!\" << endl;\n\n    int choice;\n    do {\n        cout << \"\\n1. Deposit  2. Withdraw  3. Balance  0. Exit\\n\";\n        cout << \"Choice: \";\n        cin >> choice;\n\n        if (choice == 1) {\n            double amt; cout << \"Amount: $\"; cin >> amt;\n            acct.deposit(amt);\n        } else if (choice == 2) {\n            double amt; cout << \"Amount: $\"; cin >> amt;\n            acct.withdraw(amt);\n        } else if (choice == 3) {\n            acct.checkBalance();\n        }\n    } while (choice != 0);\n\n    cout << \"Goodbye, \" << acct.getOwner() << \"!\" << endl;\n    return 0;\n}",
    explanation: "Try: name=Ada, opening=1000, then deposit 250, withdraw 500, check balance. Withdrawing more than the balance shows the guard in action.",
    quiz: {
      "question": "Why is the 'balance' member declared private rather than public in BankAccount?",
      "options": [
            "private members use less memory",
            "To prevent external code from directly setting balance to a negative value, enforcing all changes through validated methods",
            "private members cannot be accessed by constructors",
            "Only private members can be initialised in constructors"
      ],
      "answer": 1,
      "explanation": "Encapsulation means the class controls how its data is modified. Public access would allow any code to write acct.balance = -999999; bypassing all validation."
    },
    fillBlank: {
      instructions: "Complete the constructor initialiser list and the const qualifier on a getter:",
      codeTemplate: "class Account {\n    double balance;\npublic:\n    Account(double b) ___1___ balance(b) {}\n    double get() ___2___ { return balance; }\n};",
      blanks: [
        {
                "id": 1,
                "answer": ":",
                "hint": "Colon that begins the member initialiser list"
        },
        {
                "id": 2,
                "answer": "const",
                "hint": "Qualifier that promises the method does not modify the object"
        }
]
    }
  },
  {
    id: "39-references-and-pointers-compared",
    category: "Memory Architecture Extended",
    fileSlug: "39_references_vs_pointers",
    title: "39. References vs Pointers Side-by-Side",
    summary: "Compare C++ references and raw pointers: syntax, mutability, nullable semantics, and when to prefer each.",
    cBridge: "In C, indirect access always used pointers. C++ keeps raw pointers for dynamic allocation and nullable-pointer patterns, but introduces references as a cleaner alternative when: the target always exists, the binding never changes, and you want value-like syntax with pass-by-reference semantics.",
    content: "\n<h3>Reference Syntax Refresher</h3>\n<p>A reference is an alias — another name for an existing variable. It is declared with <code>&amp;</code> after the type:</p>\n\n<pre><code>int x = 42;\nint& ref = x;   // ref IS x\nref = 99;       // x is now 99\ncout &lt;&lt; x;     // 99</code></pre>\n\n<h3>Pointer Syntax Review</h3>\n<p>A pointer stores a memory address. Use <code>*</code> to declare and dereference, <code>&amp;</code> to take the address of a variable:</p>\n\n<pre><code>int x = 42;\nint* ptr = &x;  // ptr holds the address of x\n*ptr = 99;      // dereference to modify x\ncout &lt;&lt; x;     // 99</code></pre>\n\n<h3>Key Differences</h3>\n<ul>\n  <li><strong>Nullability:</strong> A pointer can be <code>nullptr</code>; a reference always refers to a valid object.</li>\n  <li><strong>Rebinding:</strong> A pointer can point to different things at different times; a reference always refers to the same object.</li>\n  <li><strong>Syntax:</strong> References use clean value-like syntax; pointers need <code>*</code> and <code>-&gt;</code>.</li>\n  <li><strong>Arithmetic:</strong> Pointers support arithmetic (<code>ptr++</code>); references do not.</li>\n</ul>",
    starterCode: "// 39_references_vs_pointers.cpp\n#include <iostream>\nusing namespace std;\n\nvoid incrementByRef(int& n)    { n++; }\nvoid incrementByPtr(int* n)    { (*n)++; }\n\nint main() {\n    int a = 10;\n\n    // Reference approach\n    int& refA = a;\n    refA = 20;\n    cout << \"After ref assignment: a = \" << a << endl;\n\n    incrementByRef(a);\n    cout << \"After incrementByRef: a = \" << a << endl;\n\n    // Pointer approach\n    int* ptrA = &a;\n    *ptrA = 100;\n    cout << \"After pointer deref assignment: a = \" << a << endl;\n\n    incrementByPtr(&a);\n    cout << \"After incrementByPtr: a = \" << a << endl;\n\n    // Pointer rebinding — references cannot do this\n    int b = 999;\n    ptrA = &b;\n    cout << \"ptrA now points to b: \" << *ptrA << endl;\n\n    // Null pointer check\n    int* maybeNull = nullptr;\n    if (maybeNull == nullptr) {\n        cout << \"Pointer is null — safe to check!\" << endl;\n    }\n\n    return 0;\n}",
    explanation: "The output walks you through both styles in parallel. Note that incrementByRef is called with just 'a', while incrementByPtr needs '&a' at the call site.",
    quiz: {
      "question": "Which of the following is TRUE about C++ references compared to pointers?",
      "options": [
            "References can be null",
            "References can be rebound to different variables after initialisation",
            "References must be initialised when declared and always refer to the same object",
            "References use the * operator for access"
      ],
      "answer": 2,
      "explanation": "A reference must be bound at declaration and cannot be rebound. It is always a valid alias — it cannot be null, and requires no dereference operator."
    },
    fillBlank: {
      instructions: "Fill in to declare a reference and dereference a pointer:",
      codeTemplate: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 5;\n    int___1___ ref = x;   // reference\n    int* ptr = &x;\n    ___2___ptr = 10;      // dereference to modify x\n    cout << ref;           // prints 10\n}",
      blanks: [
        {
                "id": 1,
                "answer": "&",
                "hint": "Symbol after int to declare a reference type"
        },
        {
                "id": 2,
                "answer": "*",
                "hint": "Dereference operator to access value at pointer address"
        }
]
    }
  },
  {
    id: "40-input-driven-word-counter",
    category: "Foundations Extended",
    fileSlug: "40_word_counter",
    title: "40. Interactive Word & Character Counter",
    summary: "Read a full sentence from the user and compute word count, character count, vowel count, and the longest word — putting strings, loops, and functions together.",
    cBridge: "In C you would tokenise with strtok(), iterate char-by-char with a pointer, and track state with integer flags. In C++ we use std::string methods like .find(), substr(), and range-based for loops — far less error-prone and more expressive.",
    content: "\n<h3>Tokenising with <code>stringstream</code></h3>\n<p>The <code>stringstream</code> class from <code>&lt;sstream&gt;</code> lets you treat a string as a stream and extract whitespace-separated tokens with <code>&gt;&gt;</code>:</p>\n\n<pre><code>#include &lt;sstream&gt;\nstringstream ss(sentence);\nstring word;\nwhile (ss &gt;&gt; word) {\n    wordCount++;\n}</code></pre>\n\n<h3>Checking Vowels with a Range-Based Loop</h3>\n<p>A range-based <code>for</code> loop iterates over every character in a string elegantly:</p>\n\n<pre><code>for (char c : sentence) {\n    c = tolower(c);\n    if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') vowels++;\n}</code></pre>",
    starterCode: "// 40_word_counter.cpp\n#include <iostream>\n#include <string>\n#include <sstream>\n#include <cctype>\nusing namespace std;\n\nint countVowels(const string& s) {\n    int count = 0;\n    for (char c : s) {\n        char lower = tolower(c);\n        if (lower=='a'||lower=='e'||lower=='i'||lower=='o'||lower=='u')\n            count++;\n    }\n    return count;\n}\n\nint main() {\n    string sentence;\n    cout << \"Enter a sentence: \";\n    getline(cin, sentence);\n\n    // Character count (excluding newline)\n    int charCount = sentence.length();\n\n    // Word count and longest word using stringstream\n    int wordCount = 0;\n    string longestWord = \"\";\n    stringstream ss(sentence);\n    string token;\n    while (ss >> token) {\n        wordCount++;\n        if (token.length() > longestWord.length())\n            longestWord = token;\n    }\n\n    int vowelCount = countVowels(sentence);\n\n    cout << \"\\n--- Analysis ---\" << endl;\n    cout << \"Characters : \" << charCount << endl;\n    cout << \"Words      : \" << wordCount << endl;\n    cout << \"Vowels     : \" << vowelCount << endl;\n    cout << \"Longest    : \" << longestWord << endl;\n\n    return 0;\n}",
    explanation: "Try the sentence: 'The quick brown fox jumps over the lazy dog'. It has 9 words, 35 chars (no spaces), 11 vowels, and 'jumps' or 'brown' as 5-letter candidates.",
    quiz: {
      "question": "What does 'stringstream ss(sentence); string word; ss >> word;' do?",
      "options": [
            "It writes the string to disk",
            "It extracts the first whitespace-delimited word from the sentence into word",
            "It splits the sentence into individual characters",
            "It converts the string to an integer"
      ],
      "answer": 1,
      "explanation": "stringstream wraps a string as a stream. The >> extraction operator reads whitespace-delimited tokens from it, just like cin reads from the console."
    },
    fillBlank: {
      instructions: "Fill in the header and extraction to tokenise a string with stringstream:",
      codeTemplate: "#include <iostream>\n#include <string>\n#include <___1___>\nusing namespace std;\n\nint main() {\n    string s = \"hello world\";\n    stringstream ss(s);\n    string word;\n    while (ss ___2___ word) cout << word << \"\\n\";\n}",
      blanks: [
        {
                "id": 1,
                "answer": "sstream",
                "hint": "Standard header providing stringstream"
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
    id: "41-function-overloading",
    category: "Foundations Extended",
    fileSlug: "41_function_overloading",
    title: "41. Function Overloading",
    summary: "Define multiple functions with the same name but different parameter lists — a core C++ feature unavailable in C.",
    cBridge: "In C, every function must have a unique name. To add two integers vs two doubles you'd write addInt() and addDouble(). C++ allows the same name add() to be overloaded: the compiler selects the correct version based on argument types at compile time.",
    content: "\n<h3>What Is Overloading?</h3>\n<p>Function overloading means defining multiple functions with the <em>same name</em> but <em>different parameter signatures</em> (number of parameters, their types, or both). The return type alone is not enough to distinguish overloads.</p>\n\n<pre><code>int add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\nstring add(string a, string b) { return a + b; }</code></pre>\n\n<h3>Name Mangling Behind the Scenes</h3>\n<p>The C++ compiler encodes the parameter types into the symbol name (a process called <em>name mangling</em>). So <code>add(int,int)</code> and <code>add(double,double)</code> become distinct linker symbols. This is why C++ function overloading is a compile-time, zero-cost abstraction.</p>\n\n<h3>Overloading with Input</h3>\n<p>You can overload functions that handle user-provided data — for example, a <code>describe()</code> function that behaves differently for strings vs integers:</p>",
    starterCode: "// 41_function_overloading.cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\n// Three overloads of 'display'\nvoid display(int n) {\n    cout << \"Integer: \" << n << endl;\n}\nvoid display(double d) {\n    cout << \"Double:  \" << d << endl;\n}\nvoid display(const string& s) {\n    cout << \"String:  \" << s << endl;\n}\n\n// Overloaded area function\ndouble area(double side) {\n    return side * side;  // Square\n}\ndouble area(double width, double height) {\n    return width * height;  // Rectangle\n}\ndouble area(double a, double b, double c) {\n    // Heron's formula for triangle\n    double s = (a + b + c) / 2.0;\n    return sqrt(s * (s-a) * (s-b) * (s-c));\n}\n\nint main() {\n    display(42);\n    display(3.14);\n    display(\"Overloading rocks\");\n\n    cout << \"Square area (5):       \" << area(5.0) << endl;\n    cout << \"Rectangle area (4,6):  \" << area(4.0, 6.0) << endl;\n    cout << \"Triangle area (3,4,5): \" << area(3.0, 4.0, 5.0) << endl;\n\n    // Interactive part: user picks a shape\n    int choice;\n    cout << \"\\nCompute area: 1=Square 2=Rectangle: \";\n    cin >> choice;\n    if (choice == 1) {\n        double s; cout << \"Side: \"; cin >> s;\n        cout << \"Area = \" << area(s) << endl;\n    } else {\n        double w, h; cout << \"Width Height: \"; cin >> w >> h;\n        cout << \"Area = \" << area(w, h) << endl;\n    }\n    return 0;\n}",
    explanation: "The compiler resolves which area() to call purely from the number of arguments. This is compile-time polymorphism — no runtime cost.",
    quiz: {
      "question": "Which part of a function signature does C++ use to distinguish overloads?",
      "options": [
            "Only the return type",
            "The function name only",
            "The number and types of parameters",
            "The variable names used inside the function body"
      ],
      "answer": 2,
      "explanation": "C++ overload resolution is based on the parameter list (count and types). The return type alone cannot distinguish two overloads."
    },
    fillBlank: {
      instructions: "Define a second overload of 'greet' that takes a name and age:",
      codeTemplate: "#include <iostream>\n#include <string>\nusing namespace std;\n\nvoid greet(string name) {\n    cout << \"Hello \" << name << endl;\n}\n\nvoid ___1___(___2___ name, int age) {\n    cout << \"Hello \" << name << \", age \" << age << endl;\n}",
      blanks: [
        {
                "id": 1,
                "answer": "greet",
                "hint": "Same name as the first function — that's overloading"
        },
        {
                "id": 2,
                "answer": "string",
                "hint": "Type of the name parameter"
        }
]
    }
  },
  {
    id: "42-file-io-read-write",
    category: "Foundations Extended",
    fileSlug: "42_file_io",
    title: "42. File I/O: Reading & Writing Files",
    summary: "Persist data beyond the console using ofstream (write) and ifstream (read) from the <fstream> header.",
    cBridge: "C used FILE* pointers with fopen(), fprintf(), fscanf(), and fclose(). C++ wraps this in stream objects: ofstream for output files and ifstream for input files. They work identically to cout/cin — stream insertion << and extraction >>.",
    content: "\n<h3>Writing to a File with <code>ofstream</code></h3>\n<p><code>ofstream</code> opens a file for writing. If it doesn't exist, it's created. By default, the file is overwritten. Append mode uses <code>ios::app</code>:</p>\n\n<pre><code>#include &lt;fstream&gt;\nofstream outFile(\"notes.txt\");\nif (outFile.is_open()) {\n    outFile &lt;&lt; \"Hello, file!\" &lt;&lt; endl;\n    outFile.close();\n}</code></pre>\n\n<h3>Reading from a File with <code>ifstream</code></h3>\n<p><code>ifstream</code> opens a file for reading. Use <code>getline()</code> to read line by line in a loop until end-of-file:</p>\n\n<pre><code>ifstream inFile(\"notes.txt\");\nstring line;\nwhile (getline(inFile, line)) {\n    cout &lt;&lt; line &lt;&lt; endl;\n}\ninFile.close();</code></pre>\n\n<h3>Always Check <code>is_open()</code></h3>\n<p>If the file cannot be opened (wrong path, no permissions), <code>is_open()</code> returns <code>false</code>. Always validate before proceeding to avoid undefined behaviour.</p>",
    starterCode: "// 42_file_io.cpp\n#include <iostream>\n#include <fstream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // --- WRITE ---\n    string filename = \"diary.txt\";\n    ofstream writer(filename);\n\n    if (!writer.is_open()) {\n        cout << \"Could not open \" << filename << \" for writing.\" << endl;\n        return 1;\n    }\n\n    cout << \"How many diary entries? \";\n    int n; cin >> n; cin.ignore();\n\n    for (int i = 1; i <= n; i++) {\n        string entry;\n        cout << \"Entry \" << i << \": \";\n        getline(cin, entry);\n        writer << \"[\" << i << \"] \" << entry << \"\\n\";\n    }\n    writer.close();\n    cout << \"Saved \" << n << \" entries to \" << filename << endl;\n\n    // --- READ BACK ---\n    cout << \"\\n--- Reading diary.txt ---\\n\";\n    ifstream reader(filename);\n\n    if (!reader.is_open()) {\n        cout << \"Could not open \" << filename << \" for reading.\" << endl;\n        return 1;\n    }\n\n    string line;\n    while (getline(reader, line)) {\n        cout << line << endl;\n    }\n    reader.close();\n\n    return 0;\n}",
    explanation: "Enter 3 entries and watch them get written to disk and immediately read back. The file 'diary.txt' will persist in the same directory as the executable after the program exits.",
    quiz: {
      "question": "What does ofstream outFile('log.txt', ios::app) do differently from ofstream outFile('log.txt')?",
      "options": [
            "It reads from the file instead of writing",
            "It overwrites the file from the beginning",
            "It appends new content to the end of the existing file instead of truncating it",
            "It creates the file only if it doesn't already exist"
      ],
      "answer": 2,
      "explanation": "ios::app (append mode) moves the write position to the end of the file, so new writes add to existing content rather than replacing it."
    },
    fillBlank: {
      instructions: "Fill in the correct stream types to write then read a file:",
      codeTemplate: "#include <fstream>\n#include <string>\nusing namespace std;\n\nint main() {\n    ___1___ out(\"test.txt\");\n    out << \"hello\" << endl;\n    out.close();\n\n    ___2___ in(\"test.txt\");\n    string line;\n    getline(in, line);\n    in.close();\n}",
      blanks: [
        {
                "id": 1,
                "answer": "ofstream",
                "hint": "Output file stream — for writing"
        },
        {
                "id": 2,
                "answer": "ifstream",
                "hint": "Input file stream — for reading"
        }
]
    }
  }
];
