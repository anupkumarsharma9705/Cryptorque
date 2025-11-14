import React, { useState } from "react";
import { Send, Radio, Mail, Linkedin, Github, Twitter } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function TeamRadio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    alert("Message received! I'll get back to you as soon as possible.");
    setFormData({ name: "", email: "", message: "" });
    setSending(false);
  };

  const socialLinks = [
    { icon: Mail, label: "Email", url: "mailto:AnupKS9705@outlook.com", color: "hover:text-red-500" },
    { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/aks9705", color: "hover:text-blue-500" },
    { icon: Github, label: "GitHub", url: "https://github.com/anupkumarsharma9705", color: "hover:text-purple-500" },
    { icon: Twitter, label: "Twitter", url: "https://x.com/Anup_9705", color: "hover:text-cyan-500" }
  ];

  return (
    <section id="team-radio" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border-2 border-red-500 rounded-full"
            style={{
              animation: `ping ${2 + i * 0.5}s cubic-bezier(0, 0, 0.2, 1) infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 mb-4">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-red-500">COMMUNICATION CHANNEL</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-red-600 to-cyan-400 bg-clip-text text-transparent">
              📞 TEAM RADIO
            </span>
          </h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Copy that. Standing by for your message. Let's connect!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-black/40 backdrop-blur-sm border-2 border-red-600/30 shadow-xl shadow-red-600/10">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Radio className="w-6 h-6 text-red-500" />
                  Send Transmission
                </h3>
                <p className="text-sm opacity-70">All fields required for clear communication</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 opacity-80">Your Name</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-black/30 border-gray-700 focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 opacity-80">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-black/30 border-gray-700 focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 opacity-80">Your Message</label>
                  <Textarea
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="bg-black/30 border-gray-700 focus:border-red-500 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 text-base rounded-lg font-semibold shadow-md hover:shadow-red-600/40 transition-all duration-300"
                >
                  {sending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </Button>

              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-sm border-2 border-cyan-600/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Quick Connect</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <div>
                      <div className="text-xs opacity-60">Email</div>
                      <div className="font-semibold">AnupKS9705@outlook.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <Radio className="w-5 h-5 text-cyan-400" />
                    <div>
                      <div className="text-xs opacity-60">Status</div>
                      <div className="font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Available for opportunities
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-sm border-2 border-purple-600/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Social Channels</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group ${social.color}`}>
                        <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold">{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-600/20 to-cyan-600/20 border-2 border-red-600/30">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">🏁</div>
                <h4 className="font-bold mb-2">Fueling the Future with Speed and Secure Precision</h4>
                <p className="text-sm opacity-70">
                  Open to full-time opportunities, internships, and exciting tech projects
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
