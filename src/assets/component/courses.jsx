import React from 'react';
import { Container } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
const Courses = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className= "text-light">About me</h1>

    <section id="about" style={{ padding: "100px 0", backgroundColor: "#FFFDD0" }}>
      <Container>
      <Image src="src\assets\Pretty sunset @naominnaekwe.jpeg" fluid />;
        <h3> Name: Lewis Rey Ricafrente</h3>
          <h3>Address: Concepcion Pequena </h3>
          <h3>City: Naga </h3>
          <h3>Province: Camarines Sur</h3>
          <h3>Gender: Male</h3>
          <h3>Nationality: Filipino</h3>
          <h3>Occupation: Mcdonald's Crew</h3>
       
      </Container>
    </section>

    
    </div>
  );
};

export default Courses;