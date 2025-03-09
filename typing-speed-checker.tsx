"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  RotateCcw,
  Play,
  Award,
  BarChart2,
  Clock,
  Zap,
  BookOpen,
  Trophy,
  Keyboard,
  Sun,
  Moon,
  Sparkles,
  ChevronUp,
  Target,
  Flame,
  Star,
  RefreshCw,
  Brain,
  Lightbulb,
  Dices,
} from "lucide-react"

// Expanded sample texts for different categories
const textCategories = {
  simple: [
    "The quick brown fox jumps over the lazy dog. Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
    "She sells seashells by the seashore. The shells she sells are surely seashells. So if she sells shells on the seashore, I'm sure she sells seashore shells.",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood? A woodchuck would chuck as much wood as a woodchuck could chuck if a woodchuck could chuck wood.",
    "Peter Piper picked a peck of pickled peppers. If Peter Piper picked a peck of pickled peppers, where's the peck of pickled peppers Peter Piper picked?",
    "Betty bought a bit of butter, but the butter Betty bought was bitter, so Betty bought a better butter, and the better butter Betty bought was better than the bitter butter Betty bought before.",
    "I scream, you scream, we all scream for ice cream. Ice cream is a frozen dessert made from cream, with added flavors and sweeteners.",
    "A journey of a thousand miles begins with a single step. Every accomplishment starts with the decision to try. The secret of getting ahead is getting started.",
  ],
  coding: [
    "function calculateSum(a, b) { return a + b; } // This function takes two parameters and returns their sum. It's a simple example of JavaScript function syntax.",
    "const fetchData = async () => { try { const response = await fetch(url); const data = await response.json(); return data; } catch (error) { console.error(error); } };",
    "import React, { useState, useEffect } from 'react'; function App() { const [data, setData] = useState([]); useEffect(() => { fetchData().then(result => setData(result)); }, []); return <div>{data.map(item => <div key={item.id}>{item.name}</div>)}</div>; }",
    "class Person { constructor(name, age) { this.name = name; this.age = age; } greet() { return `Hello, my name is ${this.name} and I am ${this.age} years old.`; } } const person = new Person('John', 30);",
    "const numbers = [1, 2, 3, 4, 5]; const doubled = numbers.map(num => num * 2); const filtered = numbers.filter(num => num > 2); const sum = numbers.reduce((acc, curr) => acc + curr, 0);",
    "try { const result = someFunction(); console.log(result); } catch (error) { console.error('An error occurred:', error.message); } finally { console.log('This will always execute'); }",
    "const promise1 = Promise.resolve('Hello'); const promise2 = fetch('https://api.example.com/data'); Promise.all([promise1, promise2]).then(values => { console.log(values); });",
  ],
  quotes: [
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. - Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "If life were predictable it would cease to be life, and be without flavor. - Eleanor Roosevelt",
    "Spread love everywhere you go. Let no one ever come to you without leaving happier. - Mother Teresa",
  ],
  paragraphs: [
    "The sun dipped below the horizon, casting long shadows across the landscape. Birds returned to their nests, singing their evening songs. A gentle breeze rustled the leaves, bringing with it the scent of wildflowers and distant rain.",
    "The ancient library stood silent, filled with thousands of books containing the wisdom of centuries. Dust particles danced in the beams of light that filtered through the high windows, illuminating the worn leather bindings and faded gold lettering.",
    "The city never sleeps, a constant hum of activity that ebbs and flows like the tide. Neon lights reflect in puddles on the rain-soaked streets, creating a kaleidoscope of colors that shimmer and dance with each passing car.",
    "Deep in the forest, a small stream trickled over smooth stones, its gentle murmur a soothing melody in the quiet woodland. Sunlight filtered through the dense canopy, creating dappled patterns on the forest floor where wildflowers bloomed in vibrant clusters.",
    "The old farmhouse stood at the end of a winding dirt road, its weathered boards and sagging porch telling stories of generations past. A rocking chair creaked gently in the breeze, as if the ghost of its former owner still enjoyed the peaceful countryside view.",
    "Mountains stretched toward the sky, their peaks dusted with snow even in summer. The air was thin and crisp, filling lungs with a refreshing purity that couldn't be found in the valleys below. Eagles soared on thermal currents, their keen eyes scanning the rugged terrain.",
    "The marketplace bustled with activity as vendors called out their wares and customers haggled over prices. Exotic spices filled the air with their pungent aromas, mingling with the scents of fresh bread, ripe fruit, and grilling meats from the food stalls.",
  ],
  technical: [
    "Quantum computing leverages the principles of quantum mechanics to process information in ways that classical computers cannot. Unlike classical bits, quantum bits or 'qubits' can exist in multiple states simultaneously, enabling quantum computers to solve complex problems more efficiently.",
    "Machine learning algorithms improve through experience. They identify patterns in data and make decisions with minimal human intervention. As these systems analyze more data, they refine their accuracy and effectiveness through various optimization techniques.",
    "Blockchain technology creates a distributed ledger system where transactions are recorded across multiple computers. This decentralized approach ensures that no single entity controls the entire chain, making the data resistant to modification and creating a transparent, verifiable record.",
    "Neural networks are computing systems inspired by the biological neural networks in animal brains. They consist of interconnected nodes or 'neurons' that process and transmit information. Deep learning uses multiple layers of these networks to progressively extract higher-level features from raw input.",
    "The Internet of Things (IoT) describes the network of physical objects embedded with sensors, software, and other technologies that connect and exchange data with other devices and systems over the internet. This interconnection enables devices to collect and share data without human intervention.",
    "Artificial intelligence encompasses various technologies that enable computers to mimic human intelligence. This includes learning from experience, recognizing objects, understanding language, solving problems, and making decisions. AI systems can be rule-based or learn from data patterns.",
    "Cybersecurity involves protecting computer systems, networks, and data from digital attacks. These attacks often aim to access, change, or destroy sensitive information, extort money, or interrupt normal business processes. Effective security measures include encryption, authentication, and continuous monitoring.",
  ],
  science: [
    "The human genome contains approximately 3 billion base pairs of DNA, which encode roughly 20,000-25,000 genes. These genes provide instructions for making proteins, the building blocks of life that perform most cellular functions and make up most cellular structures.",
    "Black holes are regions of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it. The boundary of the region from which no escape is possible is called the event horizon.",
    "Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels like coal, oil, and gas, which produces heat-trapping gases.",
    "Photosynthesis is the process by which green plants, algae, and certain bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose or other sugars. This process releases oxygen as a byproduct, which is essential for most life on Earth.",
    "Neurons communicate with each other via electrical and chemical signals. When a neuron is activated, it sends an electrical signal along its axon. When this signal reaches the synapse, it triggers the release of neurotransmitters, which bind to receptors on the receiving neuron.",
    "The periodic table organizes chemical elements according to their atomic number, electron configuration, and recurring chemical properties. Elements are presented in order of increasing atomic number, which is the number of protons in an atom's nucleus.",
    "Evolution by natural selection is the process by which organisms change over time as a result of changes in heritable physical or behavioral traits. Changes that allow an organism to better adapt to its environment will help it survive and have more offspring.",
  ],
}

// AI-generated text templates for different difficulty levels
const aiTextTemplates = {
  easy: [
    "AI can help us in many ways. It can make our work easier and faster. AI systems learn from data and get better over time.",
    "Computers are machines that process information. They have changed how we live and work. Most people use computers every day.",
    "The internet connects people around the world. It lets us share information quickly. We can learn about almost anything online.",
    "Reading is a good habit to develop. It helps us learn new things and improves our vocabulary. Many people enjoy reading books.",
    "Exercise is important for staying healthy. It makes our bodies stronger and helps us feel better. Walking is a simple form of exercise.",
  ],
  medium: [
    "Artificial intelligence is transforming industries across the global economy. Companies are using AI to automate tasks, gain insights from data, and enhance customer experiences in ways that weren't possible before.",
    "Climate change presents one of the biggest challenges of our time. Scientists are working to understand its impacts and develop solutions, while governments and businesses implement policies to reduce carbon emissions.",
    "The human brain contains approximately 86 billion neurons, forming trillions of connections. This complex network enables everything from basic bodily functions to abstract thinking and creative expression.",
    "Renewable energy sources like solar and wind power are becoming increasingly important as we transition away from fossil fuels. Technological advances have made these alternatives more efficient and cost-effective.",
    "Digital privacy concerns continue to grow as more of our lives move online. Finding the balance between convenient digital services and protecting personal information remains a significant challenge.",
  ],
  hard: [
    "Quantum computing leverages the principles of quantum mechanics to process information in fundamentally different ways than classical computers. Rather than using bits that represent either 0 or 1, quantum computers use quantum bits or 'qubits' that can exist in multiple states simultaneously through a phenomenon called superposition. This property, along with quantum entanglement, allows quantum computers to perform certain calculations exponentially faster than their classical counterparts, particularly in areas such as cryptography, material science, and complex system modeling.",
    "The integration of artificial intelligence with Internet of Things (IoT) devices is creating unprecedented opportunities for automation and data analysis across industries. These systems can continuously monitor environments, predict maintenance needs, optimize resource allocation, and adapt to changing conditions without human intervention. However, this convergence also raises significant concerns regarding data security, privacy, algorithmic bias, and the potential for autonomous systems to make consequential decisions without sufficient oversight or accountability mechanisms.",
    "Neuroplasticity refers to the brain's remarkable ability to reorganize itself by forming new neural connections throughout life. This dynamic process allows neurons to compensate for injury and disease and to adjust their activities in response to new situations or changes in their environment. Research has shown that various factors, including environmental enrichment, physical exercise, and cognitive stimulation can enhance neuroplasticity, potentially offering new approaches for treating neurological conditions and optimizing cognitive performance across the lifespan.",
    "The development of CRISPR-Cas9 gene editing technology represents one of the most significant breakthroughs in modern biotechnology. This precise method allows scientists to modify DNA sequences by effectively cutting the genome at specific locations and then letting natural repair processes take over. The implications of this technology extend across medicine, agriculture, and basic research, offering potential treatments for genetic diseases, improved crop varieties, and deeper insights into gene function. However, it also raises profound ethical questions about the extent to which humans should alter the genetic code of organisms, including potentially our own species.",
    "The concept of sustainable development encompasses the intricate balance between economic growth, environmental protection, and social equity. It requires systems thinking that acknowledges the complex interdependencies between human activities and natural ecosystems. Achieving sustainability involves transforming energy systems, reimagining urban development, revolutionizing food production, and fundamentally changing consumption patterns. This transition demands not only technological innovation but also new economic models, policy frameworks, and shifts in cultural values to ensure that development meets the needs of the present without compromising the ability of future generations to meet their own needs.",
  ],
}

// Function to generate AI text based on difficulty and topics
const generateAIText = (difficulty: string, topics: string[] = []) => {
  // Select templates based on difficulty
  const templates = aiTextTemplates[difficulty as keyof typeof aiTextTemplates] || aiTextTemplates.medium

  // If topics are provided, try to incorporate them
  if (topics.length > 0) {
    // This is a simplified simulation of AI text generation
    // In a real implementation, this would call an AI service API

    // For now, we'll just select random templates and combine them
    const selectedTemplates = []
    const numSentences = difficulty === "easy" ? 2 : difficulty === "medium" ? 3 : 4

    for (let i = 0; i < numSentences; i++) {
      const randomIndex = Math.floor(Math.random() * templates.length)
      selectedTemplates.push(templates[randomIndex])
    }

    return selectedTemplates.join(" ")
  }

  // If no topics, just return a random template
  const randomIndex = Math.floor(Math.random() * templates.length)
  return templates[randomIndex]
}

// Difficulty levels
const difficultyLevels = {
  easy: { name: "Easy", color: "text-green-500", icon: <Target className="h-4 w-4" /> },
  medium: { name: "Medium", color: "text-yellow-500", icon: <Flame className="h-4 w-4" /> },
  hard: { name: "Hard", color: "text-red-500", icon: <Zap className="h-4 w-4" /> },
}

// Achievement thresholds
const achievementsList = [
  { name: "Beginner", wpm: 20, icon: <Star className="h-5 w-5 text-yellow-400" /> },
  { name: "Intermediate", wpm: 40, icon: <Star className="h-5 w-5 text-blue-400" /> },
  { name: "Advanced", wpm: 60, icon: <Star className="h-5 w-5 text-purple-400" /> },
  { name: "Professional", wpm: 80, icon: <Star className="h-5 w-5 text-red-400" /> },
  { name: "Expert", wpm: 100, icon: <Star className="h-5 w-5 text-green-400" /> },
]

// Keyboard layout for visualization
const keyboardLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
]

export default function TypingSpeedChecker() {
  const [text, setText] = useState(textCategories.simple[0])
  const [input, setInput] = useState("")
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [startTime, setStartTime] = useState(0)
  const [correctChars, setCorrectChars] = useState(0)
  const [incorrectChars, setIncorrectChars] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [results, setResults] = useState<
    Array<{ wpm: number; accuracy: number; date: string; category: string; difficulty: string }>
  >([])
  const [category, setCategory] = useState("simple")
  const [difficulty, setDifficulty] = useState("easy")
  const [showKeyboard, setShowKeyboard] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentKey, setCurrentKey] = useState("")
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [achievements, setAchievements] = useState<string[]>([])
  const [useAI, setUseAI] = useState(false)
  const [aiTopics, setAiTopics] = useState<string[]>([])
  const [textLength, setTextLength] = useState(50) // Default text length percentage
  const [isGeneratingText, setIsGeneratingText] = useState(false)
  const [testCount, setTestCount] = useState(0)

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Start the timer
  const startTimer = useCallback(() => {
    setIsActive(true)
    setStartTime(Date.now())
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1)
    }, 1000)
  }, [])

  // Stop the timer
  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsActive(false)
  }, [])

  // Reset the test
  const resetTest = useCallback(() => {
    stopTimer()
    setInput("")
    setTimer(0)
    setWpm(0)
    setAccuracy(100)
    setIsActive(false)
    setIsFinished(false)
    setCurrentCharIndex(0)
    setCorrectChars(0)
    setIncorrectChars(0)
    setStreak(0)
    setShowConfetti(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [stopTimer])

  // Generate new text
  const generateNewText = useCallback(() => {
    setIsGeneratingText(true)

    // Simulate AI text generation with a slight delay
    setTimeout(() => {
      let newText = ""

      if (useAI) {
        // Generate AI text based on difficulty
        newText = generateAIText(difficulty, aiTopics)
      } else {
        // Select from predefined categories
        const texts = textCategories[category as keyof typeof textCategories] || textCategories.simple
        const randomIndex = Math.floor(Math.random() * texts.length)
        newText = texts[randomIndex]
      }

      // Adjust text length based on slider
      if (textLength < 100 && newText.length > 50) {
        const targetLength = Math.max(50, Math.floor(newText.length * (textLength / 100)))
        // Try to cut at a sentence boundary
        const sentenceEndIndex = newText.substring(0, targetLength).lastIndexOf(".")
        if (sentenceEndIndex > targetLength * 0.7) {
          newText = newText.substring(0, sentenceEndIndex + 1)
        } else {
          // If no good sentence boundary, just cut at the target length
          newText = newText.substring(0, targetLength) + "."
        }
      }

      setText(newText)
      resetTest()
      setTestCount((prev) => prev + 1)
      setIsGeneratingText(false)
    }, 600)
  }, [category, difficulty, resetTest, useAI, aiTopics, textLength])

  // Change text category
  const changeCategory = useCallback(
    (newCategory: string) => {
      setCategory(newCategory)
      generateNewText()
    },
    [generateNewText],
  )

  // Calculate WPM and accuracy
  const calculateStats = useCallback(() => {
    const timeInMinutes = (Date.now() - startTime) / 60000
    const wordsTyped = input.trim().split(/\s+/).length
    const newWpm = Math.round(wordsTyped / timeInMinutes)

    const totalChars = correctChars + incorrectChars
    const newAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100

    setWpm(newWpm)
    setAccuracy(newAccuracy)

    return { wpm: newWpm, accuracy: newAccuracy }
  }, [input, startTime, correctChars, incorrectChars])

  // Create confetti effect
  const createConfetti = useCallback(() => {
    if (!containerRef.current) return

    setShowConfetti(true)

    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }, [])

  // Check for achievements
  const checkAchievements = useCallback(
    (newWpm: number) => {
      const newAchievements: string[] = []

      if (newWpm >= 20 && !achievements.includes("Beginner")) {
        newAchievements.push("Beginner")
      }
      if (newWpm >= 40 && !achievements.includes("Intermediate")) {
        newAchievements.push("Intermediate")
      }
      if (newWpm >= 60 && !achievements.includes("Advanced")) {
        newAchievements.push("Advanced")
      }
      if (newWpm >= 80 && !achievements.includes("Professional")) {
        newAchievements.push("Professional")
      }
      if (newWpm >= 100 && !achievements.includes("Expert")) {
        newAchievements.push("Expert")
      }

      if (newAchievements.length > 0) {
        setAchievements((prev) => [...prev, ...newAchievements])
        return newAchievements
      }

      return []
    },
    [achievements],
  )

  // Handle input changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newInput = e.target.value

      if (!isActive && newInput.length > 0) {
        startTimer()
      }

      setInput(newInput)

      // Check character accuracy
      let correct = 0
      let incorrect = 0
      let currentStreak = 0

      for (let i = 0; i < newInput.length; i++) {
        if (i < text.length) {
          if (newInput[i] === text[i]) {
            correct++
            currentStreak++
            if (currentStreak > bestStreak) {
              setBestStreak(currentStreak)
            }
          } else {
            incorrect++
            currentStreak = 0
          }
        }
      }

      setStreak(currentStreak)
      setCorrectChars(correct)
      setIncorrectChars(incorrect)
      setCurrentCharIndex(newInput.length)

      // Set current key for keyboard visualization
      if (newInput.length > 0) {
        const lastChar = newInput[newInput.length - 1].toLowerCase()
        setCurrentKey(lastChar)
      }

      // Check if test is complete
      if (newInput.length >= text.length) {
        const stats = calculateStats()
        setIsFinished(true)
        stopTimer()

        // Check for new achievements
        const newAchievements = checkAchievements(stats.wpm)

        // Show confetti if performance is good or new achievement unlocked
        if (stats.wpm > 40 || stats.accuracy > 90 || newAchievements.length > 0) {
          createConfetti()
        }

        setResults((prev) => [
          ...prev,
          {
            ...stats,
            date: new Date().toLocaleString(),
            category: useAI ? "AI Generated" : category,
            difficulty,
          },
        ])
      }
    },
    [
      isActive,
      text,
      startTimer,
      calculateStats,
      stopTimer,
      category,
      difficulty,
      bestStreak,
      checkAchievements,
      createConfetti,
      useAI,
    ],
  )

  // Focus input on mount and generate initial text
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Generate initial text
    generateNewText()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [generateNewText])

  // Format text with highlighting for current position and errors
  const formatText = useCallback(() => {
    return text.split("").map((char, index) => {
      let className = ""

      if (index < input.length) {
        // Character has been typed
        className =
          input[index] === char
            ? "text-green-500 dark:text-green-400"
            : "text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
      } else if (index === input.length) {
        // Current character to type
        className = "bg-primary/20 text-primary dark:text-primary-foreground animate-pulse"
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      )
    })
  }, [text, input])

  // Calculate progress percentage
  const progressPercentage = text.length > 0 ? (input.length / text.length) * 100 : 0

  // Get current achievement level
  const getCurrentAchievement = () => {
    if (wpm >= 100) return "Expert"
    if (wpm >= 80) return "Professional"
    if (wpm >= 60) return "Advanced"
    if (wpm >= 40) return "Intermediate"
    if (wpm >= 20) return "Beginner"
    return "Novice"
  }

  // Render keyboard visualization
  const renderKeyboard = () => {
    return (
      <div className="mt-4 flex flex-col items-center gap-1">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((key) => {
              const isActive = key === currentKey.toLowerCase()
              return (
                <div
                  key={key}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium border transition-all ${
                    isActive ? "bg-primary text-primary-foreground border-primary scale-110" : "bg-muted border-input"
                  }`}
                >
                  {key}
                </div>
              )
            })}
          </div>
        ))}
        <div className="w-40 h-8 mt-1 flex items-center justify-center rounded-md text-sm font-medium border bg-muted border-input">
          space
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen py-8 px-4 transition-colors duration-300 ${
        darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-blue-50 to-purple-50"
      }`}
    >
      <div className="container mx-auto max-w-4xl relative">
        {/* Confetti effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 100 }).map((_, i) => {
              const size = Math.random() * 10 + 5
              const color = [
                "bg-red-500",
                "bg-blue-500",
                "bg-green-500",
                "bg-yellow-500",
                "bg-purple-500",
                "bg-pink-500",
              ][Math.floor(Math.random() * 6)]
              const left = Math.random() * 100
              const animationDuration = Math.random() * 3 + 2
              const delay = Math.random() * 0.5

              return (
                <div
                  key={i}
                  className={`absolute top-0 ${color} rounded-full`}
                  style={{
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animation: `fall ${animationDuration}s ease-in ${delay}s forwards`,
                  }}
                />
              )
            })}
          </div>
        )}

        <Card className="shadow-xl border-t-4 border-t-primary overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          <CardHeader className="text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Keyboard className="h-6 w-6 text-primary" />
                <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  TypeMaster Pro
                </CardTitle>
              </div>

              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} aria-label="Toggle dark mode" />
                <Moon className="h-4 w-4" />
              </div>
            </div>
            <CardDescription className="text-lg">
              Test and improve your typing speed with AI-generated content
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="test" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="test" className="flex items-center gap-1">
                  <Keyboard className="h-4 w-4" />
                  <span>Test</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-1">
                  <BarChart2 className="h-4 w-4" />
                  <span>Statistics</span>
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  <span>Achievements</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="test" className="space-y-4 mt-4">
                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Switch id="use-ai" checked={useAI} onCheckedChange={setUseAI} disabled={isActive} />
                      <Label htmlFor="use-ai" className="flex items-center gap-1">
                        <Brain className="h-4 w-4 text-primary" />
                        AI Text Generation
                      </Label>
                    </div>

                    {!useAI && (
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="category">Text Category</Label>
                        <Select value={category} onValueChange={changeCategory} disabled={isActive}>
                          <SelectTrigger id="category" className="w-[180px]">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="simple">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                <span>Simple</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="coding">
                              <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                <span>Coding</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="quotes">
                              <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                <span>Quotes</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="paragraphs">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                <span>Paragraphs</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="technical">
                              <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                <span>Technical</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="science">
                              <div className="flex items-center gap-2">
                                <Lightbulb className="h-4 w-4" />
                                <span>Science</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select value={difficulty} onValueChange={setDifficulty} disabled={isActive}>
                        <SelectTrigger id="difficulty" className="w-[180px]">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(difficultyLevels).map(([key, { name, color, icon }]) => (
                            <SelectItem key={key} value={key}>
                              <div className="flex items-center gap-2">
                                {icon}
                                <span className={color}>{name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="show-keyboard">Show Keyboard</Label>
                    <Switch id="show-keyboard" checked={showKeyboard} onCheckedChange={setShowKeyboard} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <Label>Text Length: {textLength}%</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={generateNewText}
                            disabled={isActive || isGeneratingText}
                          >
                            {isGeneratingText ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : useAI ? (
                              <Brain className="h-4 w-4" />
                            ) : (
                              <Dices className="h-4 w-4" />
                            )}
                            {isGeneratingText ? "Generating..." : "New Text"}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate new {useAI ? "AI" : "random"} text</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Slider
                    disabled={isActive}
                    value={[textLength]}
                    onValueChange={(value) => setTextLength(value[0])}
                    min={30}
                    max={100}
                    step={10}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg flex flex-col items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-500 dark:text-blue-400 mb-1" />
                    <span className="text-sm text-muted-foreground">Time</span>
                    <span className="font-mono text-2xl font-bold">{timer}s</span>
                  </div>

                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-lg flex flex-col items-center justify-center">
                    <BarChart2 className="h-6 w-6 text-purple-500 dark:text-purple-400 mb-1" />
                    <span className="text-sm text-muted-foreground">Speed</span>
                    <span className="font-mono text-2xl font-bold">{wpm} WPM</span>
                  </div>

                  <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-lg flex flex-col items-center justify-center">
                    <Award className="h-6 w-6 text-green-500 dark:text-green-400 mb-1" />
                    <span className="text-sm text-muted-foreground">Accuracy</span>
                    <span className="font-mono text-2xl font-bold">{accuracy}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Progress value={progressPercentage} className="h-3 flex-1" />
                  <span className="text-sm font-mono">{Math.round(progressPercentage)}%</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">
                    Current streak: <span className="font-bold">{streak}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">|</span>
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">
                    Best streak: <span className="font-bold">{bestStreak}</span>
                  </span>
                  <span className="text-sm text-muted-foreground ml-auto">Test #{testCount}</span>
                </div>

                <div className="p-4 rounded-md bg-gradient-to-r from-muted/50 to-muted/30 font-mono text-lg leading-relaxed min-h-[120px] mb-4 border border-muted">
                  {formatText()}
                </div>

                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  disabled={isFinished}
                  className="w-full p-4 rounded-md border border-input bg-background font-mono text-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Start typing..."
                />

                {showKeyboard && renderKeyboard()}

                {isFinished && (
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-md border border-primary/20 mt-6 animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                        Test Complete!
                      </h3>
                      <Badge variant="outline" className="text-sm px-3 py-1 bg-primary/10">
                        {getCurrentAchievement()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-background to-muted/50 p-4 rounded-md text-center border">
                        <p className="text-muted-foreground text-sm">Speed</p>
                        <p className="text-3xl font-bold text-primary">{wpm} WPM</p>
                      </div>
                      <div className="bg-gradient-to-br from-background to-muted/50 p-4 rounded-md text-center border">
                        <p className="text-muted-foreground text-sm">Accuracy</p>
                        <p className="text-3xl font-bold text-primary">{accuracy}%</p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                      <Button onClick={generateNewText} className="gap-2 bg-gradient-to-r from-primary to-primary/80">
                        <Play className="h-4 w-4" />
                        Try Another Text
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="stats" className="space-y-4 mt-4">
                {results.length > 0 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                          <BarChart2 className="h-5 w-5 text-blue-500" />
                          Average Speed
                        </h3>
                        <p className="text-3xl font-bold">
                          {results.length > 0
                            ? Math.round(results.reduce((acc, r) => acc + r.wpm, 0) / results.length)
                            : 0}{" "}
                          WPM
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                          <Award className="h-5 w-5 text-green-500" />
                          Average Accuracy
                        </h3>
                        <p className="text-3xl font-bold">
                          {results.length > 0
                            ? Math.round(results.reduce((acc, r) => acc + r.accuracy, 0) / results.length)
                            : 0}
                          %
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-purple-500" />
                          Best Performance
                        </h3>
                        <p className="text-3xl font-bold">
                          {results.length > 0 ? Math.max(...results.map((r) => r.wpm)) : 0} WPM
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <ChevronUp className="h-5 w-5 text-primary" />
                        Your Progress
                      </h3>
                      <div className="h-[200px] w-full bg-muted/30 rounded-md border relative overflow-hidden">
                        {results.map((result, i) => {
                          const height = (result.wpm / 120) * 100
                          return (
                            <div
                              key={i}
                              className="absolute bottom-0 bg-gradient-to-t from-primary/80 to-primary/50 rounded-t-sm transition-all duration-500"
                              style={{
                                height: `${height}%`,
                                width: `${100 / Math.max(results.length, 1)}%`,
                                left: `${(i / Math.max(results.length, 1)) * 100}%`,
                                opacity: 0.7 + (i / results.length) * 0.3,
                              }}
                              title={`WPM: ${result.wpm}, Accuracy: ${result.accuracy}%, Date: ${result.date}`}
                            >
                              <div className="absolute bottom-0 w-full text-center text-xs text-white font-medium p-1">
                                {result.wpm}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Your History</h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="p-3 text-left">Date</th>
                              <th className="p-3 text-left">Category</th>
                              <th className="p-3 text-left">Difficulty</th>
                              <th className="p-3 text-right">WPM</th>
                              <th className="p-3 text-right">Accuracy</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.map((result, index) => (
                              <tr key={index} className="border-t hover:bg-muted/30 transition-colors">
                                <td className="p-3">{result.date}</td>
                                <td className="p-3 capitalize">{result.category}</td>
                                <td className="p-3 capitalize">{result.difficulty}</td>
                                <td className="p-3 text-right font-mono">{result.wpm}</td>
                                <td className="p-3 text-right font-mono">{result.accuracy}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-lg">Complete a test to see your statistics</p>
                    <p className="text-sm mt-2">Your results will appear here after your first typing test</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievementsList.map((achievement) => {
                    const isUnlocked = achievements.includes(achievement.name)
                    return (
                      <div
                        key={achievement.name}
                        className={`p-4 rounded-lg border flex items-center gap-4 transition-all ${
                          isUnlocked
                            ? "bg-gradient-to-r from-primary/10 to-background border-primary/20"
                            : "bg-muted/30 border-muted"
                        }`}
                      >
                        <div className={`p-3 rounded-full ${isUnlocked ? "bg-primary/10" : "bg-muted"}`}>
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{achievement.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {isUnlocked
                              ? "Achieved! Reached " + achievement.wpm + " WPM"
                              : "Reach " + achievement.wpm + " WPM to unlock"}
                          </p>
                        </div>
                        {isUnlocked && (
                          <Badge className="ml-auto bg-primary/20 text-primary hover:bg-primary/30">Unlocked</Badge>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="bg-muted/30 p-4 rounded-lg border mt-4">
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Your Level
                  </h3>
                  <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${Math.min((wpm / 100) * 100, 100)}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                      {getCurrentAchievement()} - {wpm} WPM
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-between gap-2 border-t bg-muted/20">
            <Button variant="outline" onClick={resetTest} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>

            <Button onClick={generateNewText} className="gap-2 bg-gradient-to-r from-primary to-primary/80">
              <Play className="h-4 w-4" />
              New Test
            </Button>
          </CardFooter>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

