# FreeRustCamp: Complete Curriculum Plan

## Overview

**Total Duration**: 410-490 hours (core) + 30-60 hours (specialization)  
**Target**: Take learners from "finished Rust book" to "job-ready Rust developer"  
**Methodology**: Hands-on, project-based learning with immediate feedback

**Structure**: 
- **Sections 1-4**: Core curriculum (410-490 hours) - Everyone completes
- **Section 5**: Choose specialization path(s) based on career goals (30-60 hours each)
  - Path A: Systems & WebAssembly
  - Path B: Game Development  
  - Path C: Embedded Systems

---

## Curriculum Structure

### Section 1: Fundamentals & CLI Tools (80-100 hours)

**Learning Objectives:**
- Master Rust syntax and basic concepts
- Understand ownership and borrowing fundamentals
- Build practical command-line applications
- Handle errors effectively
- Work with files and external crates

**Content Breakdown:**

#### Micro-Challenges (60 challenges, ~30 hours)
1. **Syntax Basics** (10 challenges, 2-3 hours)
   - Variables and mutability
   - Functions and return types
   - Control flow (if, match, loops)
   - Basic types (i32, f64, bool, char, String)
   - Type annotations

2. **Ownership Fundamentals** (15 challenges, 5-7 hours)
   - Move semantics
   - Stack vs heap
   - Ownership transfer
   - Understanding when moves happen
   - Copy vs Move types

3. **Borrowing & References** (15 challenges, 6-8 hours)
   - Immutable references
   - Mutable references
   - Borrowing rules
   - Reference scope
   - Common borrowing patterns

4. **Error Handling** (10 challenges, 4-5 hours)
   - Option type
   - Result type
   - Pattern matching errors
   - Unwrap vs proper handling
   - Error propagation basics

5. **Collections & Iterators** (10 challenges, 4-5 hours)
   - Vec operations
   - HashMap basics
   - Iterator methods
   - Closures introduction
   - Common iterator patterns

#### Practice Projects (8 projects, ~40 hours)

1. **Hello CLI** (2 hours)
   - Simple greeting program
   - Command-line arguments
   - Basic I/O

2. **Calculator** (3 hours)
   - Parse arithmetic expressions
   - Handle operator precedence
   - Error handling for invalid input

3. **Todo List** (4 hours)
   - File-based storage
   - CRUD operations
   - Error handling

4. **Word Counter** (5 hours)
   - File reading
   - String processing
   - HashMap usage
   - Statistics calculation

5. **CSV Analyzer** (6 hours)
   - CSV parsing
   - Data aggregation
   - Error handling
   - Report generation

6. **File Organizer** (6 hours)
   - Directory traversal
   - File operations
   - Pattern matching
   - Error recovery

7. **Password Generator** (4 hours)
   - Random number generation
   - String manipulation
   - CLI argument parsing
   - Configuration options

8. **Markdown Headings Extractor** (6 hours)
   - Text parsing
   - Regex usage
   - Tree structure
   - Output formatting

#### Certification Projects (5 projects, ~30 hours)

1. **Word Frequency Counter** (6 hours)
   - Analyze text files
   - Count word frequencies
   - Generate statistics
   - Handle large files
   - 20+ tests

2. **Log File Analyzer** (6 hours)
   - Parse log formats
   - Filter and search
   - Generate reports
   - Performance optimization
   - 25+ tests

3. **Configuration File Parser** (6 hours)
   - Custom format parsing
   - Validation
   - Error messages
   - Type conversion
   - 25+ tests

4. **File Backup Tool** (6 hours)
   - Recursive directory copying
   - Progress reporting
   - Error handling
   - Resume capability
   - 30+ tests

5. **CLI Task Manager** (6 hours)
   - Full CRUD operations
   - Priority system
   - Due dates
   - Filtering and sorting
   - Persistent storage
   - 35+ tests

---

### Section 2: Data Structures & Systems Programming (110-130 hours)

**Learning Objectives:**
- Deep understanding of Rust's memory model
- Implement data structures from scratch
- Master smart pointers
- Understand systems programming concepts deeply
- Build parsers and interpreters
- Work with OS-level abstractions
- Understand operating system internals

**Content Breakdown:**

#### Micro-Challenges (95 challenges, ~50 hours)

1. **Advanced Ownership** (10 challenges, 4-5 hours)
   - Lifetimes in functions
   - Lifetime elision
   - Struct lifetimes
   - Complex borrowing scenarios

2. **Smart Pointers** (15 challenges, 6-8 hours)
   - Box<T>
   - Rc<T> and Arc<T>
   - RefCell<T>
   - Interior mutability
   - When to use which pointer

3. **Data Structures** (20 challenges, 10-12 hours)
   - Linked lists
   - Binary trees
   - Hash tables
   - Stacks and queues
   - Graphs basics

4. **Memory Management** (10 challenges, 4-5 hours)
   - Memory layout
   - Stack vs heap allocation
   - Zero-cost abstractions
   - Memory safety guarantees

5. **Operating Systems Concepts** (25 challenges, 12-15 hours)
   - **Process Management** (8 challenges)
     - Process creation and spawning (fork concept)
     - Parent-child process relationships
     - Process termination and exit codes
     - Process groups and sessions
     - Waiting for child processes
     - Process resource limits
     - Process state transitions
     - Process isolation concepts
   
   - **File Systems & I/O** (8 challenges)
     - File descriptors and how they work
     - Standard streams (stdin, stdout, stderr)
     - File permissions and ownership
     - Symbolic links vs hard links
     - Directory structure and inodes (concept)
     - Memory-mapped files (mmap concept)
     - File locking mechanisms
     - Buffered vs unbuffered I/O
   
   - **System Resources** (9 challenges)
     - Virtual memory concepts
     - Pages and page tables (concept level)
     - Stack vs heap in OS context
     - System calls overview and types
     - Signal handling (SIGINT, SIGTERM, SIGKILL, etc.)
     - Environment variables deep dive
     - Pipes and IPC basics
     - Shared memory concepts
     - Resource limits and quotas

6. **Parsing Fundamentals** (5 challenges, 3-4 hours)
   - Tokenization
   - Recursive descent parsing
   - AST construction
   - Basic evaluation

#### Practice Projects (10 projects, ~50 hours)

1. **Linked List Implementation** (4 hours)
   - Generic types
   - Ownership in data structures
   - Iterator implementation

2. **Binary Search Tree** (5 hours)
   - Recursive algorithms
   - Tree traversal
   - Memory management

3. **Hash Map from Scratch** (6 hours)
   - Hash functions
   - Collision handling
   - Dynamic resizing
   - Performance considerations

4. **LRU Cache** (5 hours)
   - Data structure design
   - Time complexity optimization
   - Interior mutability patterns

5. **Expression Parser** (6 hours)
   - Lexing
   - Parsing arithmetic expressions
   - Operator precedence
   - AST construction

6. **Simple Calculator Interpreter** (6 hours)
   - Full parsing pipeline
   - Variable support
   - Error handling
   - Evaluation engine

7. **Process Monitor** (5 hours)
   - Process listing
   - System information
   - Process management
   - Cross-platform considerations

8. **File System Walker** (4 hours)
   - Directory traversal
   - File metadata
   - Symbolic links
   - Error handling

9. **Environment Variable Manager** (3 hours)
   - Environment manipulation
   - Process environment
   - Security considerations

10. **Simple Logger** (6 hours)
    - Log levels
    - File rotation
    - Thread-safe logging
    - Configuration

11. **Process Manager Tool** (6 hours)
    - List running processes (cross-platform)
    - Monitor CPU and memory usage
    - Send signals to processes
    - Parent-child process tree visualization
    - Process filtering and search
    - **OS Concepts**: Process management, signals, system resources

12. **File System Monitor** (7 hours)
    - Watch directories for changes
    - File system event notifications
    - Track file operations (create, modify, delete)
    - Recursive directory monitoring
    - Event filtering and logging
    - **OS Concepts**: File system internals, file descriptors, I/O

13. **IPC Communication Demo** (6 hours)
    - Implement pipe-based communication
    - Message passing between processes
    - Shared memory simulation
    - Signal-based coordination
    - Error handling across processes
    - **OS Concepts**: Inter-process communication, pipes, signals

#### Certification Projects (5 projects, ~25 hours)

1. **Simple Shell** (8 hours)
   - Command execution
   - Pipes and redirection
   - Background processes
   - Signal handling
   - Environment management
   - 30+ tests

2. **Expression Parser & Evaluator** (10 hours)
   - Full lexer implementation
   - Recursive descent parser
   - AST with multiple node types
   - Variable support
   - Function calls
   - Error reporting
   - 40+ tests

3. **Thread-Safe Data Structures** (7 hours)
   - Concurrent hash map
   - Lock-free algorithms basics
   - Performance testing
   - Thread safety guarantees
   - 35+ tests

4. **Mini Operating System Simulator** (10 hours)
   - Simulate process scheduling (round-robin, priority)
   - Virtual memory management simulation
   - File system operations
   - System call interface
   - Process synchronization
   - Resource allocation
   - **Teaches**: Process lifecycle, scheduling, virtual memory, file systems, resource management
   - 45+ tests

---

### Section 3: Concurrency, Async & Networking (85-105 hours)

**Learning Objectives:**
- Master thread-based concurrency
- Understand async/await and Futures
- Build concurrent applications
- Implement network protocols
- Handle I/O efficiently
- Understand low-level networking internals

**Content Breakdown:**

#### Micro-Challenges (75 challenges, ~40 hours)

1. **Threads** (15 challenges, 6-8 hours)
   - Thread creation
   - Thread synchronization
   - Message passing
   - Shared state
   - Thread pools

2. **Channels** (10 challenges, 4-5 hours)
   - mpsc channels
   - Bounded vs unbounded
   - Channel patterns
   - Error handling

3. **Synchronization Primitives** (10 challenges, 4-5 hours)
   - Mutex
   - RwLock
   - Atomic types
   - Deadlock prevention

4. **Async Basics** (15 challenges, 7-9 hours)
   - Futures
   - async/await syntax
   - .await usage
   - Error handling in async

5. **Tokio Runtime** (10 challenges, 4-5 hours)
   - Runtime setup
   - Spawning tasks
   - Async I/O
   - Timeouts and intervals

6. **Low-Level Networking** (15 challenges, 8-10 hours)
   - **TCP/UDP Internals** (8 challenges)
     - TCP three-way handshake implementation understanding
     - TCP state machine
     - UDP datagram structure
     - Socket states and lifecycle
     - Port binding and listening
     - Connection establishment and teardown
     - Socket options (SO_REUSEADDR, etc.)
     - Network byte order (endianness)
   
   - **Protocol Design** (7 challenges)
     - Designing binary protocols
     - Protocol framing and delimiters
     - Message serialization
     - Protocol versioning
     - Error detection (checksums, CRC)
     - Flow control concepts
     - Packet structure design

#### Practice Projects (8 projects, ~35 hours)

1. **Multi-threaded File Processor** (4 hours)
   - Parallel file processing
   - Work distribution
   - Result aggregation

2. **Thread Pool** (5 hours)
   - Pool implementation
   - Task queue
   - Worker threads
   - Graceful shutdown

3. **Producer-Consumer System** (4 hours)
   - Channel patterns
   - Backpressure handling
   - Error propagation

4. **Async HTTP Client** (5 hours)
   - HTTP requests
   - Concurrent requests
   - Error handling
   - Response processing

5. **Chat Server (Thread-based)** (6 hours)
   - TCP server
   - Client handling
   - Message broadcasting
   - Connection management

6. **Async File Server** (5 hours)
   - Async file I/O
   - Concurrent connections
   - Resource management

7. **Rate Limiter** (3 hours)
   - Token bucket algorithm
   - Thread-safe implementation
   - Configuration

8. **Web Scraper** (3 hours)
   - Concurrent requests
   - HTML parsing
   - Error handling
   - Rate limiting

#### Certification Projects (5 projects, ~25 hours)

1. **Multi-threaded Log Analyzer** (6 hours)
   - Parallel file processing
   - Thread coordination
   - Performance optimization
   - Large file handling
   - 30+ tests

2. **Async Task Queue** (6 hours)
   - Task scheduling
   - Priority queue
   - Retry logic
   - Monitoring
   - 35+ tests

3. **TCP Chat Server** (5 hours)
   - Concurrent connections
   - Message routing
   - User management
   - Graceful shutdown
   - 30+ tests

4. **Custom Protocol Implementation** (4 hours)
   - Binary protocol design
   - Packet parsing
   - Error handling
   - Protocol validation
   - 25+ tests

5. **Distributed Task Processor** (4 hours)
   - Worker coordination
   - Task distribution
   - Fault tolerance
   - Progress tracking
   - 30+ tests

6. **TCP Protocol Analyzer** (6 hours)
   - Capture and parse TCP packets (using pcap library)
   - Display connection states
   - Track sequence numbers
   - Visualize handshake
   - Detect retransmissions
   - **Teaches**: TCP internals, packet structure, protocol analysis
   - 30+ tests

7. **Custom Binary Protocol** (7 hours)
   - Design a simple binary protocol
   - Implement message framing
   - Handle partial reads
   - Add checksums for integrity
   - Version negotiation
   - Client and server implementation
   - **Teaches**: Protocol design, binary serialization, network programming
   - 35+ tests

---

### Section 4: Web Development, Databases & Cryptography (110-130 hours)

**Learning Objectives:**
- Build RESTful APIs
- Integrate databases and understand internals
- Implement authentication and security
- Understand database engine internals
- Master cryptographic primitives
- Deploy production services
- Write comprehensive tests

**Content Breakdown:**

#### Micro-Challenges (90 challenges, ~50 hours)

1. **HTTP Basics** (10 challenges, 4-5 hours)
   - HTTP methods
   - Status codes
   - Headers
   - Request/response handling

2. **Web Framework (Axum)** (15 challenges, 7-9 hours)
   - Routing
   - Handlers
   - Middleware
   - Extractors
   - Error handling

3. **JSON Serialization** (10 challenges, 4-5 hours)
   - serde basics
   - Custom serialization
   - Error handling
   - Validation

4. **Database Integration** (15 challenges, 7-9 hours)
   - SQLx setup
   - Queries
   - Migrations
   - Transactions
   - Connection pooling

5. **Database Engine Internals** (15 challenges, 8-10 hours)
   - **Storage & Indexing** (8 challenges)
     - B-tree data structures
     - Hash indexes
     - Write-ahead logs (WAL)
     - Page-based storage
     - Buffer pool management
     - Index maintenance
     - Query planning basics
     - Transaction isolation levels
   
   - **Query Processing** (7 challenges)
     - Query parsing and optimization
     - Join algorithms (nested loop, hash, merge)
     - Sorting and aggregation
     - Execution plans
     - Cost-based optimization concepts
     - Index selection
     - Query caching

6. **Cryptography** (20 challenges, 10-12 hours)
   - **Cryptographic Primitives** (10 challenges)
     - Hash functions (SHA-256, SHA-3)
     - HMAC (Hash-based Message Authentication)
     - Random number generation (cryptographically secure)
     - Key derivation functions (PBKDF2, Argon2)
     - Constant-time comparisons (timing attack prevention)
     - Symmetric encryption (AES basics)
     - Asymmetric encryption concepts (RSA, ECC concepts)
     - Digital signatures
     - Nonces and salts
     - Key management basics
   
   - **Security Best Practices** (10 challenges)
     - Avoiding timing attacks
     - Secure memory handling
     - Key storage and rotation
     - Certificate validation basics
     - Common vulnerabilities (replay attacks, etc.)
     - Secure random generation
     - Password policy enforcement
     - Side-channel attack awareness
     - Encryption at rest vs in transit
     - Zero-knowledge proof concepts (basic)

#### Practice Projects (8 projects, ~45 hours)

1. **Hello World API** (2 hours)
   - Basic server setup
   - Simple routes
   - JSON responses

2. **Todo API** (6 hours)
   - CRUD operations
   - Database integration
   - Error handling

3. **User Management API** (6 hours)
   - User registration
   - Authentication basics
   - Password hashing
   - JWT tokens

4. **Blog API** (8 hours)
   - Posts and comments
   - Relationships
   - Pagination
   - Filtering

5. **File Upload Service** (5 hours)
   - Multipart handling
   - File storage
   - Validation
   - Security

6. **Rate-Limited API** (4 hours)
   - Middleware implementation
   - Rate limiting
   - Configuration
   - Monitoring

7. **WebSocket Chat** (6 hours)
   - WebSocket connections
   - Real-time messaging
   - Room management
   - Connection handling

8. **API Gateway** (8 hours)
   - Request routing
   - Load balancing basics
   - Caching
   - Logging

9. **Password Manager Backend** (8 hours)
   - Secure password storage (Argon2)
   - Master password verification
   - Encrypted vault storage
   - Key derivation from master password
   - Secure memory zeroing
   - Audit logging
   - **Teaches**: Encryption, key derivation, secure storage

10. **File Encryption Tool** (6 hours)
    - Symmetric encryption (AES-256-GCM)
    - Key generation and storage
    - Encrypt/decrypt large files (streaming)
    - Integrity verification
    - Secure key derivation
    - **Teaches**: Symmetric encryption, file handling, crypto operations

11. **JWT Authentication System** (5 hours)
    - Token generation and signing
    - Token verification and validation
    - Refresh token rotation
    - Claims and expiration
    - Signature algorithms
    - **Teaches**: Digital signatures, token-based auth, crypto in practice

12. **Simple Database Engine** (10 hours)
    - B-tree implementation for indexing
    - Page-based storage system
    - Write-ahead log (WAL)
    - Basic query parser
    - Transaction support
    - Buffer pool management
    - **Teaches**: Database internals, storage, indexing, transactions

#### Certification Projects (5 projects, ~30 hours)

1. **E-commerce API** (8 hours)
   - Products, orders, users
   - Payment processing simulation
   - Inventory management
   - Comprehensive testing
   - 50+ tests

2. **Social Media Backend** (8 hours)
   - Posts, comments, likes
   - Follow system
   - Feed generation
   - Real-time updates
   - 55+ tests

3. **Analytics Service** (6 hours)
   - Event tracking
   - Data aggregation
   - Query API
   - Performance optimization
   - 45+ tests

4. **Authentication Service** (4 hours)
   - OAuth2 basics
   - JWT management
   - Refresh tokens
   - Security best practices
   - 40+ tests

5. **Microservices Architecture** (4 hours)
   - Multiple services
   - Service communication
   - Shared libraries
   - Deployment configuration
   - 50+ tests

6. **Secure Message Exchange** (8 hours)
   - End-to-end encrypted messaging
   - Public/private key pairs
   - Message signing and verification
   - Key exchange protocol
   - Perfect forward secrecy concept
   - Secure key storage
   - **Teaches**: Asymmetric crypto, key exchange, digital signatures, security
   - 50+ tests

7. **Database Query Optimizer** (10 hours)
   - Query parsing and AST construction
   - Cost-based optimization
   - Join algorithm selection
   - Index selection strategies
   - Execution plan generation
   - Query statistics collection
   - **Teaches**: Database internals, query optimization, algorithms
   - 45+ tests

---

### Section 5: Advanced Topics & Specializations (Choose Your Path)

**Learning Objectives:**
- Performance optimization
- Advanced Rust features
- Choose specialization path based on career goals
- Production deployment
- Combine all learned concepts

**Structure**: Complete Sections 1-4 (core curriculum), then choose ONE or MORE specialization paths:

---

#### **Path A: Systems & WebAssembly (30-50 hours)**

**Content Breakdown:**

##### Micro-Challenges (30 challenges, ~15 hours)

1. **Performance Optimization** (10 challenges, 5-6 hours)
   - Benchmarking
   - Profiling
   - Memory optimization
   - Algorithm optimization

2. **Advanced Rust Features** (10 challenges, 5-6 hours)
   - Unsafe Rust basics
   - FFI
   - Macros
   - Advanced traits

3. **WebAssembly** (10 challenges, 4-5 hours)
   - Compiling to Wasm
   - wasm-bindgen
   - Browser integration
   - Performance

##### Practice Projects (3 projects, ~15 hours)

1. **Performance Profiler** (5 hours)
   - Benchmarking tool
   - Performance analysis
   - Report generation

2. **Wasm Image Processor** (5 hours)
   - Image manipulation
   - Browser integration
   - Performance optimization

3. **FFI Library Wrapper** (5 hours)
   - C library binding
   - Safe wrappers
   - Error handling

##### Certification Projects (2 projects, ~20 hours)

1. **Distributed Task Queue** (12 hours)
   - Worker system
   - Task persistence
   - Fault tolerance
   - Monitoring
   - All previous concepts
   - 60+ tests

2. **Full-Stack Application** (8 hours)
   - Backend API
   - Frontend (optional)
   - Database
   - Authentication
   - Deployment
   - Complete system
   - 70+ tests

---

#### **Path B: Game Development (40-60 hours)**

**Content Breakdown:**

##### Micro-Challenges (30 challenges, 15-18 hours)

1. **Game Loop & Rendering** (10 challenges)
   - Game loop architecture
   - Delta time calculation
   - Frame rate limiting
   - Basic 2D rendering concepts
   - Sprite rendering
   - Coordinate systems
   - Camera basics
   - Viewport and clipping

2. **Entity Component System (ECS)** (10 challenges)
   - ECS architecture understanding
   - Components design
   - Systems implementation
   - Entity management
   - Query patterns
   - Resource management
   - Event systems
   - State machines

3. **Physics & Collision** (10 challenges)
   - Basic 2D physics (velocity, acceleration)
   - Collision detection (AABB, circle)
   - Collision resolution
   - Spatial partitioning (grid, quadtree)
   - Raycasting
   - Particle systems
   - Input handling
   - Game state management

##### Practice Projects (6 projects, 25-30 hours)

1. **Pong Clone** (4 hours)
   - Ball physics
   - Paddle movement
   - Collision detection
   - Scoring system
   - Basic AI opponent
   - **Teaches**: Game loop, input, collision, rendering

2. **Snake Game** (4 hours)
   - Grid-based movement
   - Self-collision detection
   - Food spawning
   - Score tracking
   - Increasing difficulty
   - **Teaches**: Grid systems, state management, game logic

3. **Platformer Prototype** (6 hours)
   - Player movement and jumping
   - Gravity and physics
   - Platform collision
   - Level loading from files
   - Camera following
   - **Teaches**: 2D physics, collision, level design

4. **Tower Defense** (6 hours)
   - Path finding (basic A*)
   - Enemy spawning and waves
   - Tower placement
   - Projectile systems
   - Resource management
   - **Teaches**: AI, pathfinding, game economy

5. **Particle System** (3 hours)
   - Particle emitters
   - Particle lifecycle
   - Visual effects
   - Performance optimization
   - **Teaches**: Performance, graphics programming

6. **Multiplayer Pong** (6 hours)
   - Network synchronization
   - Client-server architecture
   - Input prediction
   - State reconciliation
   - Lag compensation basics
   - **Teaches**: Networking, game networking, sync

##### Certification Projects (2 projects, 12-15 hours)

1. **2D Action Game** (8 hours)
   - Complete game with multiple levels
   - Enemy AI with different behaviors
   - Power-ups and collectibles
   - Health and scoring systems
   - Menu and game states
   - Save/load functionality
   - Particle effects
   - Sound integration (or placeholder)
   - Performance: 60 FPS with 100+ entities
   - **Teaches**: Complete game architecture, ECS, optimization
   - 40+ tests

2. **Networked Multiplayer Game** (7 hours)
   - Client-server game (2-4 players)
   - Real-time synchronization
   - Authoritative server
   - Client prediction
   - Lag compensation
   - Matchmaking basics
   - Graceful disconnection
   - **Teaches**: Network game programming, concurrency, sync
   - 35+ tests

**Recommended Framework**: Bevy Engine (modern ECS, well-documented) or Macroquad (simpler, good for learning)

---

#### **Path C: Embedded Systems (30-50 hours)**

**Content Breakdown:**

##### Micro-Challenges (25 challenges, 12-15 hours)

1. **no_std Rust** (8 challenges)
   - Understanding no_std environment
   - Core vs std library
   - Custom panic handlers
   - Memory layout control
   - Startup code basics
   - Linker scripts (conceptual)
   - Bare metal initialization
   - Stack and heap in embedded

2. **Hardware Interfaces** (8 challenges)
   - Memory-mapped I/O
   - GPIO (General Purpose I/O)
   - UART communication
   - SPI protocol basics
   - I2C protocol basics
   - Interrupts and handlers
   - DMA concepts
   - Peripheral registers

3. **Embedded Patterns** (9 challenges)
   - State machines in embedded
   - Fixed-point arithmetic
   - Ring buffers
   - Bit manipulation
   - Volatile access
   - Atomic operations in embedded
   - Power management basics
   - Real-time constraints
   - Resource-constrained programming

##### Practice Projects (4 projects, 15-20 hours)

1. **LED Blinker (Simulated)** (3 hours)
   - Basic GPIO control
   - Timing and delays
   - State management
   - **Teaches**: Hardware control, embedded basics

2. **UART Echo Server** (4 hours)
   - Serial communication
   - Interrupt-driven I/O
   - Buffer management
   - **Teaches**: Communication protocols, interrupts

3. **Sensor Data Logger** (5 hours)
   - Read sensor data (simulated)
   - Data buffering
   - Storage management
   - Low-power modes
   - **Teaches**: Data collection, resource management

4. **Simple RTOS Tasks** (6 hours)
   - Task scheduling
   - Inter-task communication
   - Mutex and semaphores
   - Priority management
   - **Teaches**: RTOS concepts, embedded concurrency

##### Certification Projects (1 project, 10-12 hours)

1. **Embedded Control System** (12 hours)
   - Multi-sensor system
   - Control algorithm implementation
   - Communication with host
   - State machine for operation modes
   - Error handling and recovery
   - Performance constraints (real-time response)
   - Memory constraints (limited RAM/flash)
   - **Teaches**: Complete embedded system design
   - 30+ tests

**Note**: Can be done with simulated environment (recommended for accessibility), QEMU emulation, or real hardware (optional, user-provided)

---

## Challenge Specifications

### Micro-Challenge Template

```yaml
id: "challenge-001"
title: "Understanding Mutability"
section: 1
subsection: "Syntax Basics"
estimated_time: 5
difficulty: "beginner"
concepts: ["mutability", "variables"]

explanation: |
  In Rust, variables are immutable by default. To change a variable's value,
  you must declare it with 'mut'.

task: |
  Make the variable 'count' mutable so the code compiles and runs correctly.

starter_code: |
  fn main() {
      let count = 0;
      count = count + 1;  // This won't compile!
      println!("Count: {}", count);
  }

tests:
  - name: "code_compiles"
    type: "compilation"
    description: "Code must compile without errors"
  
  - name: "variable_is_mutable"
    type: "code_quality"
    description: "Variable 'count' must be declared with 'mut'"
    check: "contains 'mut count'"
  
  - name: "output_correct"
    type: "functional"
    description: "Output must be 'Count: 1'"
    expected_output: "Count: 1"

hints:
  - "Variables in Rust are immutable by default"
  - "Add 'mut' keyword after 'let'"
  - "The syntax is: let mut variable_name = value;"

solution: |
  fn main() {
      let mut count = 0;
      count = count + 1;
      println!("Count: {}", count);
  }
```

### Practice Project Template

```yaml
id: "project-001"
title: "Temperature Converter CLI"
section: 1
type: "practice"
estimated_time: 180
difficulty: "beginner"
concepts: ["cli", "parsing", "error_handling", "formatting"]

description: |
  Build a command-line tool that converts temperatures between
  Fahrenheit and Celsius.

user_stories:
  - "User can input a temperature and unit (F or C)"
  - "Program converts to the other unit"
  - "Program displays formatted result"
  - "Program handles invalid input gracefully"

milestones:
  - "Set up project structure"
  - "Parse command-line arguments"
  - "Implement F to C conversion"
  - "Implement C to F conversion"
  - "Add input validation"
  - "Add error messages"
  - "Format output nicely"

starter_code: |
  fn main() {
      // Your code here
  }

tests:
  - name: "accepts_arguments"
    type: "functional"
    description: "Accepts temperature and unit as arguments"
    command: "cargo run -- 32 F"
    expected_exit_code: 0
  
  - name: "converts_f_to_c"
    type: "functional"
    description: "Converts 32F to 0C correctly"
    command: "cargo run -- 32 F"
    expected_output: "0.0°C"
  
  - name: "converts_c_to_f"
    type: "functional"
    description: "Converts 100C to 212F correctly"
    command: "cargo run -- 100 C"
    expected_output: "212.0°F"
  
  - name: "handles_decimals"
    type: "functional"
    description: "Handles decimal values correctly"
    command: "cargo run -- 98.6 F"
    expected_output: "37.0°C"
  
  - name: "invalid_unit_error"
    type: "functional"
    description: "Returns error for invalid unit"
    command: "cargo run -- 32 K"
    expected_exit_code: 1
    expected_output: "Invalid unit"
  
  - name: "non_numeric_error"
    type: "functional"
    description: "Returns error for non-numeric input"
    command: "cargo run -- abc F"
    expected_exit_code: 1
    expected_output: "Invalid temperature"

hints:
  - "Use std::env::args() to get command-line arguments"
  - "Parse strings to numbers with .parse::<f64>()"
  - "Formula for F to C: (F - 32) * 5/9"
  - "Formula for C to F: (C * 9/5) + 32"
  - "Use match or if to handle different units"

reference_solution: |
  use std::env;

  fn main() {
      let args: Vec<String> = env::args().collect();
      
      if args.len() != 3 {
          eprintln!("Usage: temp_converter <temperature> <unit>");
          eprintln!("Example: temp_converter 32 F");
          std::process::exit(1);
      }
      
      let temp: f64 = match args[1].parse() {
          Ok(n) => n,
          Err(_) => {
              eprintln!("Invalid temperature: {}", args[1]);
              std::process::exit(1);
          }
      };
      
      let unit = &args[2].to_uppercase();
      
      match unit.as_str() {
          "F" => {
              let celsius = (temp - 32.0) * 5.0 / 9.0;
              println!("{:.1}°C", celsius);
          }
          "C" => {
              let fahrenheit = (temp * 9.0 / 5.0) + 32.0;
              println!("{:.1}°F", fahrenheit);
          }
          _ => {
              eprintln!("Invalid unit: {}. Use F or C", unit);
              std::process::exit(1);
          }
      }
  }
```

### Certification Project Template

```yaml
id: "cert-001"
title: "Multi-threaded Log Analyzer"
section: 3
type: "certification"
estimated_time: 360
difficulty: "advanced"
concepts: ["concurrency", "file_io", "performance", "threading"]

description: |
  Build a CLI tool that analyzes large log files using multiple threads
  for performance.

requirements:
  functional:
    - "Accept log file path as argument"
    - "Count total lines, errors, warnings, info messages"
    - "Find top 10 most frequent error messages"
    - "Calculate errors per hour"
    - "Display results in formatted table"
    - "Process files larger than RAM using streaming"
    - "Use multiple threads for performance"
  
  technical:
    - "Use threads, NOT async"
    - "Handle files up to 10GB"
    - "Process 1 million lines in under 10 seconds"
    - "Graceful error handling for missing/corrupt files"
    - "Zero compiler warnings"
    - "Proper resource cleanup"

test_suite:
  compilation:
    - "Code compiles without errors"
    - "Code compiles without warnings"
  
  functional:
    - "Accepts file path as argument"
    - "Counts total lines correctly"
    - "Identifies error vs warning vs info"
    - "Finds top 10 errors correctly"
    - "Handles missing file with error message"
    - "Handles corrupt file gracefully"
    - "Uses multiple threads (checked in tests)"
    - "Processes large file without loading entirely into RAM"
    - "Performance: 1M lines in < 10 seconds"
    - "No compiler warnings"
    - "Proper cleanup on exit"
    # ... 20+ more tests

  # Tests are visible to user, but implementations are hidden
  # No hints available
  # No solution provided
```

---

## Test System Design

### Test Types

1. **Compilation Tests**
   - Must compile without errors
   - Must compile without warnings (certification)
   - Specific compiler checks

2. **Functional Tests**
   - Output matching
   - Return value correctness
   - Edge case handling
   - Error condition behavior

3. **Code Quality Tests**
   - Uses specific features
   - Naming conventions
   - Documentation presence
   - Clippy warnings

4. **Performance Tests**
   - Time limits
   - Large input handling
   - Algorithm efficiency

5. **Architecture Tests**
   - Thread usage
   - Pattern implementation
   - Separation of concerns
   - Error type usage

### Test Execution Flow

```
1. User submits code
2. Save code to temporary file
3. Run `cargo check` (compilation test)
4. If passes, run `cargo build`
5. Run functional tests
6. Run code quality checks (clippy)
7. Run performance tests (if applicable)
8. Aggregate results
9. Display feedback
```

---

## Progress Tracking

### Data Structure

```json
{
  "user_id": "local-user",
  "completed_challenges": ["challenge-001", "challenge-002"],
  "completed_projects": ["project-001"],
  "current_challenge": "challenge-003",
  "section_progress": {
    "1": {
      "completed": 15,
      "total": 73,
      "percentage": 20.5
    }
  },
  "total_time_spent": 12345,
  "streak_days": 5,
  "last_activity": "2026-01-24T10:30:00Z"
}
```

---

## Career Preparation Matrix

| Section | Job Roles Prepared For |
|---------|----------------------|
| Section 1 | Junior Rust Developer, CLI Tool Developer |
| Section 2 | Systems Programmer, Operating Systems Engineer, Compiler Engineer, Data Structure Engineer |
| Section 3 | Backend Engineer, Network Programmer, Protocol Developer, Concurrent Systems Developer |
| Section 4 | Full-Stack Developer, API Developer, Backend Engineer, Database Engineer, Security Engineer |
| Section 5 Path A | Senior Rust Developer, Systems Architect, Performance Engineer, WebAssembly Engineer |
| Section 5 Path B | Game Developer, Graphics Programmer, Game Engine Developer |
| Section 5 Path C | Embedded Systems Engineer, IoT Developer, Firmware Engineer |

**Complete Curriculum** prepares for:
- Systems Engineer / Systems Programmer
- Operating Systems Engineer
- Backend Engineer (high-performance services)
- Blockchain/Crypto Developer
- WebAssembly Engineer
- Compiler/DevTools Engineer
- Network Engineer / Protocol Developer
- Cloud Infrastructure Engineer
- SRE (Site Reliability Engineer)
- Database Engineer
- Security Engineer / Cryptography Specialist
- Game Developer / Game Engine Developer
- Embedded Systems Engineer / Firmware Engineer
- IoT Developer

---

## Implementation Notes

- All challenges must be completable in stated time
- Tests must provide helpful error messages
- Solutions must exist and be verified
- Difficulty must match section placement
- Projects must build on previous knowledge
- Real-world relevance is mandatory
