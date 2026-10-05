import json
import os

questions_file = r"C:\vscode\TestMaker\gate-cse-test-series\data\questions.json"

existing_q = []
if os.path.exists(questions_file):
    with open(questions_file, "r", encoding="utf-8") as f:
        existing_q = json.load(f)

new_questions = [
  {
    "id": 101,
    "testId": "dbms-01",
    "type": "MCQ",
    "question": "Which of the following relational algebra operations is NOT a primitive (basic) operation?",
    "options": ["Selection (σ)", "Projection (π)", "Natural Join (⋈)", "Cartesian Product (×)"],
    "answer": ["Natural Join (⋈)"],
    "subject": "Database Management Systems",
    "topic": "Relational Algebra",
    "difficulty": "Medium",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "Natural Join is a derived operation which can be expressed using Cartesian Product, Selection, and Projection."
  },
  {
    "id": 102,
    "testId": "dbms-01",
    "type": "MCQ",
    "question": "Given a relation R(A, B, C, D) with functional dependencies: A -> B, B -> C, C -> D. What is the candidate key of R?",
    "options": ["A", "B", "C", "D"],
    "answer": ["A"],
    "subject": "Database Management Systems",
    "topic": "Candidate Keys",
    "difficulty": "Easy",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "The closure of A, A+ = {A, B, C, D}, which contains all attributes of relation R. Thus A is the unique candidate key."
  },
  {
    "id": 103,
    "testId": "dbms-norm-01",
    "type": "MSQ",
    "question": "Which of the following statements regarding Normal Forms are TRUE?",
    "options": [
      "Every relation in BCNF is also in 3NF.",
      "3NF decomposition always guarantees lossless join and dependency preservation.",
      "BCNF decomposition always preserves functional dependencies.",
      "Every relation in 3NF is also in BCNF."
    ],
    "answer": [
      "Every relation in BCNF is also in 3NF.",
      "3NF decomposition always guarantees lossless join and dependency preservation."
    ],
    "subject": "Database Management Systems",
    "topic": "Normal Forms (3NF/BCNF)",
    "difficulty": "Hard",
    "marks": 2,
    "negativeMarks": 0,
    "explanation": "BCNF is strictly stronger than 3NF, so BCNF -> 3NF. 3NF decomposition can always achieve both Lossless Join and Dependency Preservation, whereas BCNF may lose dependencies."
  },
  {
    "id": 104,
    "testId": "dbms-txn-01",
    "type": "NAT",
    "question": "Consider a B+ tree index of order m (where m is max children per node). If key size = 12 bytes and block pointer = 8 bytes, block size = 512 bytes, what is the maximum order m of the B+ tree node?",
    "options": [],
    "answer": ["26"],
    "subject": "Database Management Systems",
    "topic": "B+ Trees",
    "difficulty": "Hard",
    "marks": 2,
    "negativeMarks": 0,
    "explanation": "Order m implies max m pointers and (m-1) keys per node. m*8 + (m-1)*12 <= 512 => 20m - 12 <= 512 => 20m <= 524 => m = 26."
  },
  {
    "id": 105,
    "testId": "dbms-txn-01",
    "type": "MCQ",
    "question": "Which lock mode allows multiple transactions to read a data item concurrently but prevents any transaction from writing?",
    "options": ["Exclusive (X) lock", "Shared (S) lock", "Intent Exclusive (IX) lock", "Update lock"],
    "answer": ["Shared (S) lock"],
    "subject": "Database Management Systems",
    "topic": "Two-Phase Locking (2PL)",
    "difficulty": "Easy",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "Shared locks (S) are compatible with other Shared locks, allowing concurrent read operations."
  },

  # Operating Systems Questions
  {
    "id": 106,
    "testId": "os-01",
    "type": "MCQ",
    "question": "In a Round Robin CPU scheduling algorithm with time quantum Q, as Q tends to infinity (∞), the algorithm degenerates into:",
    "options": ["Shortest Job First (SJF)", "First Come First Served (FCFS)", "Priority Scheduling", "Shortest Remaining Time First (SRTF)"],
    "answer": ["First Come First Served (FCFS)"],
    "subject": "Operating Systems",
    "topic": "Round Robin Scheduling",
    "difficulty": "Easy",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "When time quantum Q is larger than max process burst time, no process is preempted before completion, behaving exactly like FCFS."
  },
  {
    "id": 107,
    "testId": "os-sync-01",
    "type": "MCQ",
    "question": "Which of the following conditions is NOT a necessary condition for a deadlock to occur?",
    "options": ["Mutual Exclusion", "Hold and Wait", "Preemption", "Circular Wait"],
    "answer": ["Preemption"],
    "subject": "Operating Systems",
    "topic": "Banker's Algorithm & Deadlocks",
    "difficulty": "Medium",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "The four Coffman conditions are: Mutual Exclusion, Hold & Wait, NO Preemption, and Circular Wait. Preemption breaks deadlock!"
  },
  {
    "id": 108,
    "testId": "os-mem-01",
    "type": "NAT",
    "question": "A virtual memory system uses 32-bit virtual addresses and a page size of 4 KB (4096 bytes). How many entries are there in a single-level page table?",
    "options": [],
    "answer": ["1048576"],
    "subject": "Operating Systems",
    "topic": "Paging & Address Translation",
    "difficulty": "Medium",
    "marks": 2,
    "negativeMarks": 0,
    "explanation": "Page offset = log2(4096) = 12 bits. Page number bits = 32 - 12 = 20 bits. Total page table entries = 2^20 = 1,048,576."
  },
  {
    "id": 109,
    "testId": "os-sync-01",
    "type": "MSQ",
    "question": "Which of the following statements about Semaphores are TRUE?",
    "options": [
      "Counting semaphores can take any non-negative integer value.",
      "Binary semaphores take values 0 or 1.",
      "wait() operation increments the semaphore value.",
      "signal() operation decrements the semaphore value."
    ],
    "answer": [
      "Counting semaphores can take any non-negative integer value.",
      "Binary semaphores take values 0 or 1."
    ],
    "subject": "Operating Systems",
    "topic": "Semaphores",
    "difficulty": "Medium",
    "marks": 2,
    "negativeMarks": 0,
    "explanation": "wait() (P) decrements semaphore S, while signal() (V) increments semaphore S."
  },
  {
    "id": 110,
    "testId": "os-disk-01",
    "type": "MCQ",
    "question": "Which disk scheduling algorithm services requests by moving the disk arm towards one end, servicing requests along the way, and immediately returning to the beginning without servicing requests on the return trip?",
    "options": ["SCAN", "C-SCAN", "LOOK", "SSTF"],
    "answer": ["C-SCAN"],
    "subject": "Operating Systems",
    "topic": "Disk Scheduling Algorithms (SCAN, C-LOOK)",
    "difficulty": "Easy",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "C-SCAN (Circular SCAN) moves in one direction servicing requests and returns to start without servicing requests on return."
  },

  # Computer Networks Questions
  {
    "id": 111,
    "testId": "cn-01",
    "type": "NAT",
    "question": "In a Stop-and-Wait ARQ protocol, if packet transmission time = 1 ms and round-trip propagation time (RTT) = 9 ms, what is the channel utilization percentage?",
    "options": [],
    "answer": ["10"],
    "subject": "Computer Networks",
    "topic": "Sliding Window Protocols (Go-Back-N, Selective Repeat)",
    "difficulty": "Medium",
    "marks": 2,
    "negativeMarks": 0,
    "explanation": "Efficiency η = T_trans / (T_trans + RTT) = 1 / (1 + 9) = 1/10 = 10%."
  },
  {
    "id": 112,
    "testId": "cn-net-01",
    "type": "MCQ",
    "question": "What is the network address for an IP address 192.168.10.45 with subnet mask 255.255.255.224 (/27)?",
    "options": ["192.168.10.0", "192.168.10.32", "192.168.10.64", "192.168.10.16"],
    "answer": ["192.168.10.32"],
    "subject": "Computer Networks",
    "topic": "IPv4 Subnetting & CIDR",
    "difficulty": "Medium",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "224 in binary is 11100000. Block size = 256 - 224 = 32. Subnet ranges are 0-31, 32-63. IP 45 falls in 32 network, so network ID is 192.168.10.32."
  },
  {
    "id": 113,
    "testId": "cn-trans-01",
    "type": "MSQ",
    "question": "Which of the following fields are present in the UDP header?",
    "options": ["Source Port", "Destination Port", "Sequence Number", "Checksum"],
    "answer": ["Source Port", "Destination Port", "Checksum"],
    "subject": "Computer Networks",
    "topic": "UDP Header & Sockets",
    "difficulty": "Medium",
    "marks": 2,
    "negativeMarks": 0,
    "explanation": "UDP header consists of 4 fields (8 bytes total): Source Port, Destination Port, Length, and Checksum. Sequence number belongs to TCP header."
  },

  # Data Structures & Algorithms Questions
  {
    "id": 114,
    "testId": "dsa-tree-01",
    "type": "MCQ",
    "question": "What is the maximum height of an AVL tree with n internal nodes?",
    "options": ["O(log n)", "O(n)", "O(sqrt(n))", "O(1)"],
    "answer": ["O(log n)"],
    "subject": "Data Structures & Algorithms",
    "topic": "AVL Rotations",
    "difficulty": "Easy",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "AVL trees enforce balance factor of at most 1, guaranteeing height bounded by 1.44 * log2(n) = O(log n)."
  },
  {
    "id": 115,
    "testId": "dsa-graph-01",
    "type": "MCQ",
    "question": "Which graph traversal technique uses a Queue data structure?",
    "options": ["Depth First Search (DFS)", "Breadth First Search (BFS)", "Topological Sort using DFS", "Tarjan Algorithm"],
    "answer": ["Breadth First Search (BFS)"],
    "subject": "Data Structures & Algorithms",
    "topic": "BFS & DFS Traversals",
    "difficulty": "Easy",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "BFS explores vertices level by level, using a Queue (FIFO) to track frontier vertices."
  },
  {
    "id": 116,
    "testId": "dsa-graph-01",
    "type": "NAT",
    "question": "Consider a connected weighted undirected graph with 6 vertices and 10 edges. What is the number of edges in any Minimum Spanning Tree (MST) of this graph?",
    "options": [],
    "answer": ["5"],
    "subject": "Data Structures & Algorithms",
    "topic": "Prim's & Kruskal's MST",
    "difficulty": "Easy",
    "marks": 1,
    "negativeMarks": 0,
    "explanation": "Any Spanning Tree of a connected graph with V vertices contains exactly V - 1 edges. For V = 6, MST edges = 5."
  },

  # Theory of Computation Questions
  {
    "id": 117,
    "testId": "gate-toc-01",
    "type": "NAT",
    "question": "What is the minimum number of states in a Deterministic Finite Automaton (DFA) that accepts all binary strings ending with '101'?",
    "options": [],
    "answer": ["4"],
    "subject": "Theory of Computation",
    "topic": "DFA State Minimization",
    "difficulty": "Medium",
    "marks": 2,
    "negativeMarks": 0,
    "explanation": "For pattern of length k, minimum DFA states required to recognize strings ending with that pattern is k + 1. Here length of 101 is 3, so states = 3 + 1 = 4."
  },
  {
    "id": 118,
    "testId": "toc-cfg-01",
    "type": "MSQ",
    "question": "Which of the following language classes are closed under Intersection?",
    "options": ["Regular Languages", "Context-Free Languages", "Deterministic Context-Free Languages (DCFL)", "Recursive Languages"],
    "answer": ["Regular Languages", "Recursive Languages"],
    "subject": "Theory of Computation",
    "topic": "Closure Properties of CFLs",
    "difficulty": "Hard",
    "marks": 2,
    "negativeMarks": 0,
    "explanation": "Regular and Recursive languages are closed under intersection. CFLs and DCFLs are NOT closed under intersection."
  },

  # COA Questions
  {
    "id": 119,
    "testId": "gate-coa-01",
    "type": "NAT",
    "question": "A 5-stage instruction pipeline has stage delays of 150 ps, 120 ps, 180 ps, 160 ps, and 140 ps. Interface register delay is 10 ps. What is the clock cycle time of the pipeline in ps?",
    "options": [],
    "answer": ["190"],
    "subject": "Computer Organization & Architecture",
    "topic": "Pipeline Speedup & Throughput",
    "difficulty": "Medium",
    "marks": 2,
    "negativeMarks": 0,
    "explanation": "Clock cycle time t = max(stage delays) + register delay = 180 + 10 = 190 ps."
  },
  {
    "id": 120,
    "testId": "coa-cache-01",
    "type": "MCQ",
    "question": "In a 4-way set-associative cache with 64 sets and line size of 16 bytes, how many bits are used for Tag if memory address is 32-bit?",
    "options": ["20", "22", "18", "16"],
    "answer": ["22"],
    "subject": "Computer Organization & Architecture",
    "topic": "Cache Mapping Schemes",
    "difficulty": "Medium",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "Block offset = log2(16) = 4 bits. Set index = log2(64) = 6 bits. Tag bits = 32 - (4 + 6) = 22 bits."
  },

  # Compiler Design Questions
  {
    "id": 121,
    "testId": "compiler-01",
    "type": "MCQ",
    "question": "Which parser is the most powerful among the bottom-up parsers listed below?",
    "options": ["LR(0)", "SLR(1)", "LALR(1)", "CLR(1) / Canonical LR(1)"],
    "answer": ["CLR(1) / Canonical LR(1)"],
    "subject": "Compiler Design",
    "topic": "LALR vs CLR Parsers",
    "difficulty": "Easy",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "Canonical LR(1) or CLR(1) is the most powerful LR parser; LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ CLR(1)."
  },

  # Digital Logic Questions
  {
    "id": 122,
    "testId": "digital-01",
    "type": "NAT",
    "question": "How many 2-to-1 Multiplexers are required to implement a 16-to-1 Multiplexer?",
    "options": [],
    "answer": ["15"],
    "subject": "Digital Logic",
    "topic": "Multiplexers & Logic Realization",
    "difficulty": "Easy",
    "marks": 1,
    "negativeMarks": 0,
    "explanation": "To implement N-to-1 MUX using 2-to-1 MUX, total required = N - 1 = 16 - 1 = 15."
  },

  # Discrete Mathematics Questions
  {
    "id": 123,
    "testId": "discrete-graph-01",
    "type": "NAT",
    "question": "A simple planar connected graph has 10 vertices and 15 edges. According to Euler's formula, how many faces does this graph have?",
    "options": [],
    "answer": ["7"],
    "subject": "Discrete Mathematics",
    "topic": "Planar Graphs & Euler's Formula",
    "difficulty": "Easy",
    "marks": 1,
    "negativeMarks": 0,
    "explanation": "Euler's formula for connected planar graphs: V - E + F = 2 => 10 - 15 + F = 2 => F = 7."
  },

  # Engineering Mathematics Questions
  {
    "id": 124,
    "testId": "math-la-01",
    "type": "MCQ",
    "question": "If A is a 3×3 matrix with eigenvalues 1, 2, and 3, what is the determinant of matrix A?",
    "options": ["6", "5", "1", "0"],
    "answer": ["6"],
    "subject": "Engineering Mathematics",
    "topic": "Eigenvalues & Eigenvectors Properties",
    "difficulty": "Easy",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "The determinant of a matrix equals the product of its eigenvalues. Det(A) = 1 * 2 * 3 = 6."
  },

  # General Aptitude Questions
  {
    "id": 125,
    "testId": "placement-aptitude-01",
    "type": "MCQ",
    "question": "If A can complete a work in 10 days and B can complete the same work in 15 days, working together how many days will they take to finish the work?",
    "options": ["6 days", "8 days", "12 days", "5 days"],
    "answer": ["6 days"],
    "subject": "General Aptitude",
    "topic": "Time & Work Problems",
    "difficulty": "Easy",
    "marks": 1,
    "negativeMarks": 0.33,
    "explanation": "Combined rate = 1/10 + 1/15 = 5/30 = 1/6. Total days = 6."
  }
]

existing_ids = set(q["id"] for q in existing_q)
all_questions = list(existing_q)

for nq in new_questions:
    if nq["id"] not in existing_ids:
        all_questions.append(nq)
        existing_ids.add(nq["id"])

with open(questions_file, "w", encoding="utf-8") as f:
    json.dump(all_questions, f, indent=2, ensure_ascii=False)

print(f"Successfully saved {len(all_questions)} questions to questions.json")
