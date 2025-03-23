import { Shield, Truck, Users, Target, Clock, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const managementTeam = [
  {
    title: "Managing Director and Cheif Executive",
    name: "Joseph E. Agbara",
    image: "/lovable-uploads/Managing Director and Cheif Executive.jpg",
    description: "He acquired his experience in various Steel Processing Mills in Germany. He oversees the general operations of the company, procurement of raw materials as well as production and sales of the finished goods. Mr. Agbara worked for a German Steel Firm Messrs NCIE LIMITED for over eleven (11) years as Branch Manager. He attended various courses and seminars both locally and abroad. He is married with children"
  },
  {
    title: "Executive Director",
    name: "Engr. Emmanuel Agbara",
    image: "/lovable-uploads/Mr Osita.jpeg",
    description: "After he acquired his undergraduate degree in Mechanical Engineering from the University of Sheffield and his MSc in Engineering Project Management from the University of Leeds, he quickly joined in the steel trading business under the tutoring of Mr Joseph Agbara and other well experienced staff members. He currently manages and supervises the running of the company."
  },
  {
    title: "Chief Engineer",
    name: "Sebastian Oparaji",
    image: "/lovable-uploads/secretary.jpg",
    description: "He has acquired his experience in various positions he has occupied over the years and is the chief engineer at our factory plant, who oversees the smooth running of production ensuring equipments are in shape. He is married with kids."
  },
];

const features = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Our products undergo rigorous testing and meet international standards for excellence in steel manufacturing."
  },
  {
    icon: Target,
    title: "Precision Delivery",
    description: "Strategic logistics network ensuring timely delivery across West Africa with real-time tracking."
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description: "Dedicated team of steel industry professionals providing comprehensive technical support."
  },
  {
    icon: Clock,
    title: "Timely Service",
    description: "Quick response times and efficient project execution to meet your deadlines."
  },
  {
    icon: Award,
    title: "Industry Leadership",
    description: "Recognized excellence in steel manufacturing and distribution services."
  },
  {
    icon: Truck,
    title: "Nationwide Coverage",
    description: "Extensive distribution network reaching all corners of Nigeria and beyond."
  }
];

const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 space-y-20">
        {/* Company Overview */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-steel-primary mb-8 text-center">
            ABOUT JEASON STEEL COMPANY
          </h2>
          <p className="text-lg text-steel-gray text-justify max-w-4xl mx-auto mb-12 leading-relaxed">
            A family owned business, with its main office in Lagos, Nigeria, <b>Jeason Steel Company 
            Limited</b> is a world class trader and producer of fabricated and galvanized steel products and 
            structures. Utilizing cutting edge automated manufacturing technology in its main factory fully 
            equipped and complimented by a skilled workforce, also in Lagos. Jeason has the capacity to 
            produce 20,000 metric tons per annum of galvanized structures from its modern facility.
            <br /><br />
            The vast experiences of our management in the last twenty-five (25) years in the steel trading 
            business, gives us the opportunity to serve our customers in a way of finding engineering 
            solutions (and structures) and achieving their implementation completion. Over the years, we 
            have provided thousands of customers with durable, affordable and versatile steel structured 
            buildings and accessories for hundreds of different uses and in various regions. With our 
            experience, we strive to deliver right and on time.
            <br /><br />
            With our well structured facility located in the industrial hub of central Lagos, Nigeria, we aim 
            to please our customers and achieve our goals by offering efficient and effective services, from 
            the time of production, fabrication, cutting, molding, packaging and distribution.
            Today, Jeason continues to expand the horizons of metal building construction by providing 
            better customer service, and improving products to meet every construction need.
          </p>
        </div>

        {/* Management Team Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-steel-primary mb-12 text-center">
            Our Leadership Team
          </h2>
          <div className="space-y-16">
            {managementTeam.map((member, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="w-64 h-64 rounded-full overflow-hidden mx-auto border-4 border-steel-light">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-steel-primary mb-2">
                    {member.name}
                  </h3>
                  <p className="text-xl text-steel-secondary mb-4">{member.title}</p>
                  <p className="text-steel-gray text-lg">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="max-w-7xl mx-auto bg-steel-light rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-steel-primary">Our Vision</h3>
              <p className="text-steel-gray text-lg">
              Jeason Steel Company Limited has a vision of being a leading and dominant world class
supplier and manufacturer of high quality iron and steel products to oil and gas
companies as well as const rucon companies in Nigeria for the West African market,
that promotes the steel trading economy, to create a beer and safer environment, to
possibly create jobs to support the development of the community and to promote the

              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-steel-primary">Our Mission</h3>
              <p className="text-steel-gray text-lg">
Engaging and developing suitable employees to adequately and efficiently produce
high-quality and allocang products at compeve prices within a reasonable lead me
to the mar ket which enables development and maintenance of excellent customer
relaonships that result in acceptable returns for company shareholders.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-steel-primary mb-12 text-center">
            Why Choose Jeason Steel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 text-center hover:bg-steel-light rounded-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-steel-primary mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-steel-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-steel-gray">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
