// import React, {Component} from 'react';

// export default class chatList extends Component {
//     render() {
//         return (
//             <React.Fragment>
//                 <div className="messageBoardContainer">
//                 <section className="messages">
//                 {this.props.messages.map(singleMessage => (
//                     div key={singleMessage.id}
//                 ))}


//                 <button type="button"
//                  className"btn btn-success
//                  onClick={() => {
//                      this.props.history.push("/messages/new")
//                  }}>Send Message</button>
//                  </section>
//                 </div>
//             </React.Fragment>
//         )
//     }
// }

// export default class Locations extends Component {
//     render() {
//         return (
//           <React.Fragment>
//             <div className="animalButton">
//             <button type="button"
//               className="btn btn-success"
//               onClick={() => {
//                 this.props.history.push("/locations/new")
//               }}>Establish New Location</button>
//             </div>
//             <section className="locations">
//             {this.props.locations.map(singleLocation => (
//               <div key={singleLocation.id} className="card">
//               <div className="card-body">
//                <h5 className="card-title">
//                 <Link className="nav-link" to={`/locations/${singleLocation.id}`}>Details</Link>
//                 </h5>
//                 </div>
//                 </div>
//             ))}
//               </section>

//           </React.Fragment>

//         );
//       }
//     }

