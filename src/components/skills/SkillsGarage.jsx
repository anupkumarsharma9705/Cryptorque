// import React from "react";
// import { Wrench, Cpu, Database, Palette, Zap, Code2 } from "lucide-react";
// import { Card, CardContent } from "../ui/card";

// const skillCategories = [
//   {
//     title: "Frontend Engine",
//     icon: Palette,
//     color: "from-red-600 to-red-800",
//     skills: ["React",  "TypeScript", "Tailwind CSS", ],
//     description: "Building blazing-fast user interfaces"
//   },
//   {
//     title: "Backend Transmission",
//     icon: Database,
//     color: "from-cyan-600 to-cyan-800",
//     skills: ["Python", "PostgreSQL", "MongoDB"],
//     description: "Powering applications with robust backends"
//   },
//   {
//     title: "DevOps Pit Crew",
//     icon: Wrench,
//     color: "from-orange-600 to-orange-800",
//     skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Git", "Linux"],
//     description: "Optimizing deployment and performance"
//   },
//   {
//     title: "AI/ML Turbocharger",
//     icon: Cpu,
//     color: "from-purple-600 to-purple-800",
//     skills: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLP", "Data Analysis"],
//     description: "Accelerating with machine intelligence"
//   },
//   {
//     title: "Mobile Chassis",
//     icon: Code2,
//     color: "from-green-600 to-green-800",
//     skills: ["React Native", "Flutter", "iOS", "Android", "PWA", "Responsive Design"],
//     description: "Cross-platform engineering excellence"
//   },
//   {
//     title: "Performance Telemetr",
//     icon: Zap,
//     color: "from-yellow-600 to-yellow-800",
//     skills: ["Testing", "Optimization", "Analytics", "Monitoring", "Security", "Scalability"],
//     description: "Measuring and maximizing efficiency"
//   }
// ];

// export default function SkillsGarage() {
//   return (
//     <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       <div className="absolute inset-0 carbon-fiber opacity-5"></div>
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent"></div>

//       <div className="w-full px-6 mx-auto relative z-10">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-600/10 border border-cyan-600/30 mb-4">
//             <Wrench className="w-4 h-4 text-cyan-500" />
//             <span className="text-sm font-semibold text-cyan-500">TECHNICAL ARSENAL</span>
//           </div>
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
//             <span className="bg-gradient-to-r from-cyan-400 to-red-600 bg-clip-text text-transparent">
//               🔧 SKILLS GARAGE
//             </span>
//           </h2>
//           <p className="text-lg opacity-70 max-w-2xl mx-auto">
//             Every great race car needs the right components
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {skillCategories.map((category, index) => {
//             const IconComponent = category.icon;
//             return (
//               <Card
//                 key={index}
//                 className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-gray-700 hover:border-cyan-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                       <IconComponent className="w-7 h-7 text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">
//                         {category.title}
//                       </h3>
//                       <p className="text-xs opacity-60">{category.description}</p>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     {category.skills.map((skill, i) => (
//                       <div
//                         key={i}
//                         className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
//                       >
//                         <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-cyan-500"></div>
//                         <span className="text-sm font-medium">{skill}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-cyan-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
//                 </CardContent>

//                 <div className="absolute inset-0 carbon-fiber opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
//               </Card>
//             );
//           })}
//         </div>

//         <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
//           <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-600/20 to-transparent border border-red-600/30">
//             <div className="text-4xl font-black text-red-500 mb-2">5+</div>
//             <div className="text-sm opacity-70">Years Experience</div>
//           </div>
//           <div className="text-center p-6 rounded-xl bg-gradient-to-br from-cyan-600/20 to-transparent border border-cyan-600/30">
//             <div className="text-4xl font-black text-cyan-400 mb-2">30+</div>
//             <div className="text-sm opacity-70">Technologies</div>
//           </div>
//           <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-600/20 to-transparent border border-orange-600/30">
//             <div className="text-4xl font-black text-orange-500 mb-2">50+</div>
//             <div className="text-sm opacity-70">Projects Completed</div>
//           </div>
//           <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-600/30">
//             <div className="text-4xl font-black text-purple-500 mb-2">∞</div>
//             <div className="text-sm opacity-70">Lines of Code</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import {
  Code,
  Globe,
  Database,
  Terminal,
  Network,
  Binoculars,
  ShieldCheck,
  Wrench,
  Layers
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

// Updated skills structure
const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    color: "from-red-600 to-red-800",
    skills: ["Java", "C++", "SQL",],
    description: "Core languages for application development, scripting, and data manipulation."
  },
  {
    title: "Web Development",
    icon: Globe,
    color: "from-green-600 to-green-800",
    skills: ["HTML", "CSS", "JavaScript"],
    description: "Frontend technologies for building responsive, interactive web interfaces."
  },
  {
    title: "Backend & Databases",
    icon: Database,
    color: "from-cyan-600 to-cyan-800",
    skills: ["SQL"],
    description: "Server-side logic and relational database design, queries, and integration."
  },
  {
    title: "Systems & Operating Environments",
    icon: Terminal,
    color: "from-orange-600 to-orange-800",
    skills: ["Windows", "Linux"],
    description: "Administration and scripting across Windows and Linux environments."
  },
  {
    title: "Networking & Traffic Analysis",
    icon: Network,
    color: "from-yellow-600 to-yellow-800",
    skills: ["Nmap", "Wireshark (basic)", "TCP/IP", "OSI Model"],
    description: "Network scanning, packet capture and protocol-level analysis for diagnostics and security."
  },
  {
    title: "Reconnaissance & OSINT",
    icon: Binoculars,
    color: "from-indigo-600 to-indigo-800",
    skills: ["whois", "theHarvester", "whatweb"],
    description: "Passive and active information-gathering, asset discovery, and web fingerprinting."
  },
  {
    title: "Security Concepts & Software Design",
    icon: ShieldCheck,
    color: "from-purple-600 to-purple-800",
    skills: ["OOPs", "NIST Cybersecurity Framework (basics)"],
    description: "Foundational software design principles and basic knowledge of security frameworks and controls."
  },
  {
    title: "Frameworks & Methodologies",
    icon: Layers, // or ClipboardCheck / PuzzlePiece for visual variety
    color: "from-purple-600 to-purple-800",
    skills: ["React (basic)", "Spring Boot (basics)"],
    description: "Understanding of core software frameworks and development methodologies, with foundational experience in building modular, maintainable applications."
  }

];

export default function SkillsGarage() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 carbon-fiber opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent"></div>

      <div className="w-full px-6 mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-600/10 border border-cyan-600/30 mb-4">
            <Wrench className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-semibold text-cyan-500">TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-red-600 bg-clip-text text-transparent">
              🔧 SKILLS GARAGE
            </span>
          </h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Every great race car needs the right components
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-gray-700 hover:border-cyan-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-xs opacity-60">{category.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {category.skills.map((skill, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-cyan-500"></div>
                        <span className="text-sm font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-cyan-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </CardContent>

                <div className="absolute inset-0 carbon-fiber opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-600/20 to-transparent border border-red-600/30">
            <div className="text-4xl font-black text-red-500 mb-2">0</div>
            <div className="text-sm opacity-70">Years Experience</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-cyan-600/20 to-transparent border border-cyan-600/30">
            <div className="text-4xl font-black text-cyan-400 mb-2">30+</div>
            <div className="text-sm opacity-70">Technologies</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-600/20 to-transparent border border-orange-600/30">
            <div className="text-4xl font-black text-orange-500 mb-2">3</div>
            <div className="text-sm opacity-70">Projects Completed</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-600/30">
            <div className="text-4xl font-black text-purple-500 mb-2">∞</div>
            <div className="text-sm opacity-70">Lines of Code</div>
          </div>
        </div>
      </div>
    </section>
  );
}
