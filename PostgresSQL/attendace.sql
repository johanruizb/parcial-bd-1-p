CREATE TABLE IF NOT EXISTS Estudiantes (
    serial_estudiantes serial,
    codigo_estudiante VARCHAR(10) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    PRIMARY KEY(codigo_estudiante)
);

CREATE TABLE IF NOT EXISTS Cursos (
    serial_cursos serial,
    curso_id VARCHAR(10) NOT NULL,
    curso_nombre VARCHAR(100) NOT NULL,
    codigo_estudiante VARCHAR(10) NOT NULL,
    PRIMARY KEY (curso_id, serial_cursos),
    FOREIGN KEY (codigo_estudiante) REFERENCES Estudiantes(codigo_estudiante) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Asistencia (
    serial_asistencia serial,
    curso_id VARCHAR(10) NOT NULL,
    fecha VARCHAR(100) NOT NULL,
    codigo_estudiante VARCHAR(10) NOT NULL,
    PRIMARY KEY (serial_asistencia),
    FOREIGN KEY (codigo_estudiante) REFERENCES Estudiantes(codigo_estudiante) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Personal (
    serial_personal serial,
    codigo_personal VARCHAR(100) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    salario int NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    EPS VARCHAR(100),
    ARL VARCHAR(100),
    PRIMARY KEY(codigo_personal)
);

CREATE TABLE IF NOT EXISTS Sedes (
    serial_sede serial,
    sede_id VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(100) NOT NULL,
    codigo_personal VARCHAR(100) NOT NULL,
    curso_id VARCHAR(10) NOT NULL,
    PRIMARY KEY(sede_id),
    FOREIGN KEY (codigo_personal) REFERENCES Personal(codigo_personal) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Administradores (
    administradores_serial serial,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    sede_id VARCHAR(100) NOT NULL,
    PRIMARY KEY(nombre),
    FOREIGN KEY (sede_id) REFERENCES Sedes(sede_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS InicioSesion (
    login_serial serial,
    contraseña VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    rol VARCHAR(10) NOT NULL,
    PRIMARY KEY(username)
);