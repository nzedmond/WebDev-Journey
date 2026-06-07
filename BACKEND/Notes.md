# REST API

> REST defines a consistent and uniform interface for interactions between clients and servers. For example, the HTTP-based REST APIs make use of the standard HTTP methods (GET, POST, PUT, DELETE) and the URIs to identify resources.

> Separation of concerns: by separating the user interface concerns (client) from data storage concerns (server), we improve the portability of the user interface across multiple platforms and improve scalability by simplifying the server components. 

> Statelessness mandates that each request from the client to the server must contain all of the information necessary to understand and complete the request. The server cannot keep the session state, only the client application must.

> The cacheable constraint requires that a response should implicitly or explicitly label itself as cacheable or non-cacheable.

> In layered system, each component cannot see beyond the immediate layer they are interacting with.

> A REST API consists of an assembly of interlinked resources. 
    > This set of resources is known as the REST API's resource model.


# PYTHON VIRTUAL ENVIRONMENT

When a Python interpreter is running from a virtual environment, sys.prefix and sys.exec_prefix point to the directories of the virtual environment, whereas sys.base_prefix and sys.base_exec_prefix point to those of the base Python used to create the environment. It is sufficient to check sys.prefix != sys.base_prefix to determine if the current interpreter is running from a virtual environment.

## DAY 3, exercise2.py

 > GET endpoints don't take bodies - they take query/path parameters.
