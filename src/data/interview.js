// Technical Interview Mode. Answers are fully editable here.

export const interviewQuestions = [
  {
    id: 1,
    question: "What is Spring Boot?",
    answer:
      "Spring Boot is a framework built on top of the Spring Framework that simplifies Java application development. It provides auto-configuration, starter dependencies and an embedded server, so an application can be built and run without heavy XML configuration.",
  },
  {
    id: 2,
    question: "How does Spring Boot handle REST APIs?",
    answer:
      "Spring Boot exposes REST endpoints using @RestController along with mapping annotations such as @GetMapping, @PostMapping, @PutMapping and @DeleteMapping. Request bodies and responses are converted to and from JSON automatically, and @RequestBody, @PathVariable and @RequestParam bind incoming data to method parameters.",
  },
  {
    id: 3,
    question: "How does React communicate with a Spring Boot backend?",
    answer:
      "React calls the Spring Boot REST endpoints over HTTP using fetch or axios. The backend returns JSON, React stores it in state and renders it. CORS must be configured on the Spring Boot side so the browser allows requests from the React origin.",
  },
  {
    id: 4,
    question: "What is JDBC?",
    answer:
      "JDBC (Java Database Connectivity) is a Java API for connecting to relational databases. It uses a driver, a Connection, Statement or PreparedStatement, and a ResultSet to execute SQL and read results directly from Java code.",
  },
  {
    id: 5,
    question: "JDBC vs JPA?",
    answer:
      "JDBC is a low-level API where SQL is written manually and results are mapped by hand. JPA is a specification for object-relational mapping where entities map to tables and the provider generates most SQL. JDBC gives finer control; JPA reduces boilerplate.",
  },
  {
    id: 6,
    question: "What is OOP?",
    answer:
      "Object-Oriented Programming organizes software around objects that combine data and behaviour. Its four core principles are encapsulation, inheritance, polymorphism and abstraction.",
  },
  {
    id: 7,
    question: "What is DBMS?",
    answer:
      "A Database Management System is software used to store, retrieve and manage data. A relational DBMS such as MySQL organizes data into tables with rows and columns and supports SQL, constraints, transactions and indexing.",
  },
  {
    id: 8,
    question: "How would you design a MySQL database?",
    answer:
      "Start by identifying the entities and their attributes, define primary keys, establish relationships with foreign keys, then normalize the schema to remove redundancy. After that, choose appropriate data types and add indexes on the columns used most often in queries.",
  },
  {
    id: 9,
    question: "What is the request-response cycle?",
    answer:
      "The client sends an HTTP request to a server endpoint. The server routes it to a controller, the controller calls the service layer, the service uses the data layer to read or write the database, and a response with a status code and body travels back to the client.",
  },
  {
    id: 10,
    question: "How would you structure a Java backend?",
    answer:
      "A common layered structure: controller for HTTP endpoints, service for business logic, repository or DAO for database access, model or entity classes for data, and DTOs for request and response shapes. Configuration and exception handling are kept in their own packages.",
  },
  {
    id: 11,
    question: "How does a React application communicate with an API?",
    answer:
      "React sends HTTP requests from an effect or event handler using fetch or axios, keeps loading and error state, and renders the returned JSON. Requests are usually collected into a small API layer so components stay focused on the UI.",
  },
];
