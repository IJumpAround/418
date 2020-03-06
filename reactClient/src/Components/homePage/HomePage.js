import React, { Component } from 'react';
import '../homePage/HomePage.css';


 class HomePage extends Component {

  render() {
    return (

    <div class="home">
      <br />    
      <h1 class="display-3"><i>Where to Live?...</i></h1>    
      <br />
          <div class="container pt-3 my-3 bg-dark">
            <p class="text-info">
              So you've decided to go to UAlbany,  congratulations!! Nothing's more exciting than going away to 
              college for the first time. All the new experiences and friends you'll make along the way will shape 
              you into the adult that will venture forth into the real world, so obviously you want to get the best
              experience possible; the best classes, the best clubs, the best roomates, the best.... dorm?? How are 
              you supposed to know what the best dorm-room for you is at UAlbany?? It's not like there are pictures 
              and reviews of all the dorm-rooms on campus...is there?
              <br />
              <br />
              Well now there is! Welcome to Rate My Dorm: the website where you can view and review the various living 
              spaces provided to you here at UAlbany. Do you prefer a low rise or the 15th tower floor? Maybe you dont
              mind having a communal bathroom so long as its close to the dining hall?? Whatever your preference for 
              living is, you can find a dorm that fits your desires. You can even see reviews from current UAlbany 
              Students living in the dorms youre looking at to get a first person view on what living there is like.
              <br />
              <br />
              So what are you waiting for? Come in and take a look around, you might just find your next dorm room.
            </p>
          </div>     
      </div>
     
    )
  }
}


export default HomePage;