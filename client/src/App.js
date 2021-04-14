import React from "react";
import { Container, Row, Form, FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import Axios from 'axios'
import {useState} from 'react'





    function App(){
       
      const [nom,setNom]=useState("");
      const [description,setdescription]=useState("");
      const [lieu,setlieu]=useState("");
      const [date,setdate]=useState("");
      const [heure,setheure]=useState("");

      const [eventList,setEventList]=useState([]);
      const [Unevenement,setEvenenemnt]=useState([]);
      //recuperation des evenemnt
      const getEvent =()=>{
        Axios.get('http://localhost:3001/event').then ((response)=>{
          setEventList(response.data);
        });
      };
     
      /*modif
      const ModifierEvent =(nom)=>{
          Axios.get(`http://localhost:3001/evenement/${nom}`).then((response) => {
          setEvenenemnt(response.data);
          this.setState({[nom]: Unevenement.nom })
        });
      };*/
    

     



      //ajout d'une evenement
      const ajoutEvent=()=>{
        Axios.post('http://localhost:3001/ajoutEvent',{
          nom:nom,
          description:description,
          lieu:lieu,
          date:date,
          heure:heure,
        }).then(()=>{
          setEventList([
           ...eventList,
           {
            nom:nom,
            description:description,
            lieu:lieu,
            date:date,
            heure:heure,
           }
          ])

        })

      }

      const supprimeEvent = (id) => {
        Axios.delete(`http://localhost:3001/supprimeEvent/${id}`).then((response) => {
          setEventList(
            eventList.filter((val) => {
              return val.id != id;
            })
          );
        });
      };

     

/*
      const [event, setEvent] = useState({
        nom: "",
        description: "",
      });
      const loadEvent = async () => {
        const result = Axios.get(`http://localhost:3001/Unevent/${nom}`);
        setEvent(result.data);
        console.log(result.nom);
      };


      const sendUpdate = (nom) => {
        Axios.put(`http://localhost:3001/update/${nom}`).then(
          (response) => {
            setEvent(
              event.map((val) => {
                return val.nom == nom
                  ? {
                    nom:nom,
                    description:description
                    }
                  : val;
              })
            );
          }
        );
      };*/
     
     /* const sendUpdate = (nom) => {
        const ligneAmodif = {
          nom : this.state.nom,
          description : this.state.description,
        }

        Axios.delete(`http://localhost:3001/sendUpdate/${nom}`).then((response) => {
          setEventList(
            eventList.filter((val) => {
              return val.nom != nom;
            })
          );
        });
      };*/



      /*mise a jour des données
      const modiferEvent = (id) => {
        Axios.put("http://localhost:3001/modifierEvent", { nom: nom, description: description }).then(
          (response) => {
            setEventList(
              eventList.map((val) => {
                return val.id == id
                  ? {
                      nom: val.nom,
                      description: val.description,
                    }
                  : val;
              })
            );
          }
        );
      };*/


    return (
    <div>
      <Container>
        <div class="row"> 
        <div class="col s12">
          <h3>Création</h3>
          <h6>Evénement</h6>
          <hr></hr>
                    <Form class="form-group">


                                 <FormGroup>
                                  <FormLabel>Nom</FormLabel>
                                  <FormControl  type="text" name="nom" placeholder="Intitulé de l'évenement" onChange={(event)=>{setNom(event.target.value)}} ></FormControl>
                                </FormGroup>
                                
                                
                                <FormGroup>
                                  <FormLabel>Description</FormLabel>
                                  <textarea class="form-control" name="description" rows="3"  placeholder="Plus d'informations sur l'évenement"  onChange={(event)=>{setdescription(event.target.value)}}/>
                                </FormGroup>
                                 
                                <div class="form-row">
                               <div class="col-6"> 
                                <FormGroup>
                                  <FormLabel>Lieu</FormLabel>
                                  <FormControl type="text" name="lieu"  placeholder="Ajouter l'adresse" onChange={(event)=>{setlieu(event.target.value)}}></FormControl>
                                </FormGroup>
                                </div>
                                <div class="col-3"> 
                                <FormGroup >
                                  <FormLabel>Date</FormLabel>
                                  <input class="form-control" type="date"  name="date"  onChange={(event)=>{setdate(event.target.value)}}/>
                                </FormGroup>
                                </div>
                                <div class="col-3"> 
                                <FormGroup>
                                  <FormLabel>Heure</FormLabel>
                                  <input class="form-control" type="time" name="heure" onChange={(event)=>{setheure(event.target.value)}} />
                                </FormGroup>
                                </div>
                              </div>
                                <Button class="btn btn-success btn-block"  onClick={ajoutEvent}>Ajouter</Button>
                                
                                <hr></hr>
                              </Form>    
                              
              </div>
              </div>
            
                  <div class="row">
                  
                  <button class="btn btn-link btn-lg" onClick={getEvent}>Voir évenements</button> 
          <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Description</th>
              <th scope="col">Lieu</th>
              <th scope="col">Date</th>
              <th scope="col">Heure</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {eventList.map((evt, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{evt.nom}</td>
                <td>{evt.description}</td>
                <td>{evt.lieu}</td>
                <td>{evt.date}</td>
                <td>{evt.heure}</td>
              
                <td>
                  <button class="btn btn-danger" onClick={() => {supprimeEvent(evt.id)}}> Supprimer</button>
                 &nbsp;&nbsp;

                  <a href="" class="btn btn-outline-primary mr-2">Modifier</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

       </Container>
    </div>
    )
  }

export default App;
