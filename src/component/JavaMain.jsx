import React, { useState, useEffect } from 'react';

export default function CodeAnimationIntro() {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [scaleDown, setScaleDown] = useState(false);

  const javaCode = `public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to My Portfolio");
    }
}`;

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 50; // milliseconds per character

    const typingInterval = setInterval(() => {
      if (currentIndex <= javaCode.length) {
        setDisplayedCode(javaCode.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
        
        // After typing completes, wait 800ms then scale back down
        setTimeout(() => {
          setScaleDown(true);
        }, 800);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [javaCode]);

  // Function to apply syntax highlighting to the displayed code
  const highlightSyntax = (code) => {
    const parts = [];
    let i = 0;
    
    while (i < code.length) {
      const remaining = code.slice(i);
      
      // Keywords
      if (remaining.startsWith('public')) {
        parts.push(<span key={i} className="text-purple-400">public</span>);
        i += 6;
      } else if (remaining.startsWith('class')) {
        parts.push(<span key={i} className="text-purple-400">class</span>);
        i += 5;
      } else if (remaining.startsWith('static')) {
        parts.push(<span key={i} className="text-purple-400">static</span>);
        i += 6;
      } else if (remaining.startsWith('void')) {
        parts.push(<span key={i} className="text-purple-400">void</span>);
        i += 4;
      } else if (remaining.startsWith('String')) {
        parts.push(<span key={i} className="text-purple-400">String</span>);
        i += 6;
      }
      // Class/Method names
      else if (remaining.startsWith('Main')) {
        parts.push(<span key={i} className="text-yellow-300">Main</span>);
        i += 4;
      } else if (remaining.startsWith('main')) {
        parts.push(<span key={i} className="text-blue-400">main</span>);
        i += 4;
      }
      // System.out
      else if (remaining.startsWith('System')) {
        parts.push(<span key={i} className="text-cyan-400">System</span>);
        i += 6;
      } else if (remaining.startsWith('out')) {
        parts.push(<span key={i} className="text-cyan-400">out</span>);
        i += 3;
      } else if (remaining.startsWith('println')) {
        parts.push(<span key={i} className="text-blue-400">println</span>);
        i += 7;
      }
      // Strings
      else if (remaining.startsWith('"')) {
        const endQuote = remaining.indexOf('"', 1);
        if (endQuote !== -1) {
          const str = remaining.slice(0, endQuote + 1);
          parts.push(<span key={i} className="text-green-400">{str}</span>);
          i += str.length;
        } else {
          parts.push(<span key={i} className="text-green-400">{remaining}</span>);
          i += remaining.length;
        }
      }
      // Punctuation
      else if ('()[]{}.,;'.includes(code[i])) {
        parts.push(<span key={i} className="text-yellow-300">{code[i]}</span>);
        i++;
      }
      // Default white text
      else {
        parts.push(<span key={i} className="text-gray-300">{code[i]}</span>);
        i++;
      }
    }
    
    return parts;
  };

  return (
    <section className="flex-1 flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-2xl">
        {/* Code Block */}
        <div
          className={`
            bg-gray-950 rounded-lg shadow-2xl p-6 border border-gray-700
            transition-all duration-1000 ease-in-out
            ${!isTypingComplete ? 'scale-100' : ''}
            ${isTypingComplete && !scaleDown ? 'scale-110' : ''}
            ${scaleDown ? 'scale-100' : ''}
          `}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-gray-400 text-sm font-mono">Main.java</span>
          </div>

          <pre className="text-left overflow-hidden">
            <code className="text-sm md:text-base font-mono whitespace-pre-wrap wrap-break-word">
              {highlightSyntax(displayedCode)}
              {!isTypingComplete && (
                <span className="inline-block w-2 h-5 bg-green-400 animate-pulse ml-1 align-middle"></span>
              )}
            </code>
          </pre>
        </div>


      </div>
     </section>
  );
}