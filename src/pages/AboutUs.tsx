
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Aboutus from "@/resources/bmdh about-us.png";

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: "Team Member",
      position: "Founder & CEO",
      bio: "With over 20 years of experience in real estate, Member founded BookMyDreamHome with a vision to revolutionize property buying and selling in India.",
      image: "/placeholder.svg"
    },
    {
      name: "Team Member",
      position: "Chief Operating Officer",
      bio: "Member oversees day-to-day operations and has helped scale BookMyDreamHome across multiple cities with her strategic leadership.",
      image: "/placeholder.svg"
    },
    {
      name: "Team Member",
      position: "Chief Technology Officer",
      bio: "A tech enthusiast with a passion for innovation, Member leads our development team in creating cutting-edge real estate solutions.",
      image: "/placeholder.svg"
    },
    {
      name: "Team Member",
      position: "Head of Marketing",
      bio: "Member brings creative strategies to connect buyers with their dream properties through targeted marketing campaigns.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-10">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-3 text-foreground">About BookMyDreamHome</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Helping Indians find their dream homes since 2015.
          </p>
        </header>

        {/* Our Story Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4 text-foreground">
                BookMyDreamHome was founded in 2015 with a simple mission: to make finding and purchasing a dream home as seamless as possible for Indians across the country.
              </p>
              <p className="mb-4 text-foreground">
                What started as a small team in Pune has now grown to a nationwide service, helping thousands of families find their perfect homes. We've combined technology with personalized service to create a property marketplace that prioritizes the dreams and needs of our customers.
              </p>
              <p className="text-foreground">
                Today, we proudly serve customers in over 20 cities, with a growing inventory of premium properties and partnerships with leading developers across India.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src={Aboutus} 
                alt="BookMyDreamHome office" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-foreground">Transparency</h3>
                  <p className="text-muted-foreground">
                    We believe in clear and honest communication with all our clients, ensuring you have all the information you need to make informed decisions.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-foreground">Innovation</h3>
                  <p className="text-muted-foreground">
                    We constantly strive to improve our platform and services, embracing new technologies to enhance your property search experience.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-foreground">Customer-First</h3>
                  <p className="text-muted-foreground">
                    Your needs are our priority. We're dedicated to providing personalized service that prioritizes your home ownership dreams.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Team Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-xl mb-1 text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.position}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">© 2025 by BookMyDreamHome Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
