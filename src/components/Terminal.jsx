import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => (
      <div className="space-y-2">
        <p>Available commands:</p>
        <ul className="list-disc pl-5">
          <li><span className="text-[#915eff]">help</span> - Show available commands</li>
          <li><span className="text-[#915eff]">about</span> - About me</li>
          <li><span className="text-[#915eff]">skills</span> - My technical skills</li>
          <li><span className="text-[#915eff]">projects</span> - View my projects</li>
          <li><span className="text-[#915eff]">contact</span> - Contact information</li>
          <li><span className="text-[#915eff]">clear</span> - Clear terminal</li>
          <li><span className="text-[#915eff]">exit</span> - Close terminal</li>
        </ul>
      </div>
    ),
    about: () => (
      <p>I am a Full Stack Developer skilled in React, Node.js, MySQL, and MongoDB. Passionate about building user-friendly, scalable web applications with clean and efficient code. Always eager to learn, adapt, and contribute to innovative projects.</p>
    ),
    skills: () => (
      <div className="space-y-2">
        <p>Technical Skills:</p>
        <ul className="list-disc pl-5">
          <li>Frontend: React, Next.js, Three.js, TailwindCSS</li>
          <li>Backend: Node.js, Express</li>
          <li>Languages: HTML, CSS, JavaScript, C++, SQL</li>
          <li>Tools: Git, VS Code, MySQL Workbench, Supabase, Power BI, Canva, Figma</li>
          <li>AI Tools: Cursor, Claude, Firebase Studio</li>
        </ul>
      </div>
    ),
    projects: () => (
      <div className="space-y-2">
        <p>Recent Projects:</p>
        <ul className="list-disc pl-5">
          <li>Linkroo - Next.js, TypeScript, Tailwind CSS, Supabase, Radix, Sonner </li>
          <li>Lexroo - Next.js, Tailwind CSS, Shadcn, Recharts, Lucide React, React Hooks, Typescript</li>
          <li>Urban Roost -HTML, Tailwind CSS, JavaScript, React.js, Spring Framework, Hibernate, MySQL</li>
        </ul>
      </div>
    ),
    contact: () => (
      <div className="space-y-2">
        <p>Email: vrajp9013@gmail.com</p>
        <p>GitHub: github.com/Itsvrajpatel</p>
        <p>LinkedIn: linkedin.com/in/vraj-patel-web-developer/</p>
      </div>
    ),
  };

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();

    if (command === "clear") {
      setHistory([]);
      return null;
    }

    if (command === "exit") {
      setIsOpen(false);
      return null;
    }

    return commands[command]?.() || (
      <p className="text-red-500">Command not found. Type 'help' for available commands.</p>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const output = handleCommand(input);
    if (output) {
      setHistory([...history, { command: input, output }]);
    }
    setInput("");
  };

  return (
    <>
      {/* Terminal Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 bg-[#915eff] p-3 rounded-full shadow-lg hover:bg-[#804dee] transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3" />
        </svg>
      </button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-5 w-[calc(100vw-40px)] sm:w-[600px] h-[400px] max-h-[80vh] bg-black rounded-lg overflow-hidden shadow-lg border border-[#915eff] z-50"
          >
            {/* Terminal Header */}
            <div className="bg-[#915eff] p-2 flex justify-between items-center">
              <span className="text-white font-mono">Terminal</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="p-4 h-[calc(100%-80px)] overflow-y-auto font-mono text-[#915eff]"
            >
              <p className="mb-4">Welcome! Type 'help' for available commands.</p>

              {history.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center">
                    <span className="text-[#915eff] mr-2">$</span>
                    <span>{item.command}</span>
                  </div>
                  <div className="ml-4 mt-1">{item.output}</div>
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleSubmit} className="absolute bottom-0 w-full p-2 border-t border-[#915eff]">
              <div className="flex items-center">
                <span className="text-[#915eff] mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-[#915eff] outline-none font-mono"
                  placeholder="Type a command..."
                />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

