import React, { useState } from 'react';

export default function LoopLogicComparison() {
  const [version1Steps, setVersion1Steps] = useState([]);
  const [version2Steps, setVersion2Steps] = useState([]);
  const [testString, setTestString] = useState("heeellooo");
  const [startPos, setStartPos] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  const runVersion1 = () => {
    const steps = [];
    const str = testString;
    const start = startPos;
    let end = start;
    let iteration = 0;
    const maxIterations = 20;

    steps.push({
      iteration: 0,
      end,
      char: str[end],
      condition1: `end(${end}) < ${str.length}`,
      condition1Result: end < str.length,
      condition2: `str[${end}]('${str[end]}') === str[${start}]('${str[start]}')`,
      condition2Result: str[end] === str[start],
      action: 'Starting position',
      continueLoop: true
    });

    while (end < str.length && str[end] === str[start] && iteration < maxIterations) {
      iteration++;
      end++;
      const stillInBounds = end < str.length;
      const charsMatch = stillInBounds ? str[end] === str[start] : false;
      
      steps.push({
        iteration,
        end,
        char: stillInBounds ? str[end] : 'END',
        condition1: `end(${end}) < ${str.length}`,
        condition1Result: stillInBounds,
        condition2: stillInBounds ? `str[${end}]('${str[end]}') === str[${start}]('${str[start]}')` : 'N/A',
        condition2Result: charsMatch,
        action: 'end++',
        continueLoop: stillInBounds && charsMatch
      });

      if (!stillInBounds || !charsMatch) break;
    }

    const groupLength = end - start;
    steps.push({
      iteration: 'FINAL',
      end,
      char: 'DONE',
      condition1: 'Loop terminated',
      condition1Result: true,
      condition2: '',
      condition2Result: false,
      action: `Group length = ${end} - ${start} = ${groupLength}`,
      continueLoop: false
    });

    setVersion1Steps(steps);
  };

  const runVersion2 = () => {
    const steps = [];
    const str = testString;
    const start = startPos;
    let end = start;
    let iteration = 0;
    const maxIterations = 10; // Limit to prevent infinite loop

    steps.push({
      iteration: 0,
      end,
      char: str[end],
      whileCondition: `end(${end}) < ${str.length}`,
      whileResult: end < str.length,
      ifCondition: `str[${end}]('${str[end]}') === str[${start}]('${str[start]}')`,
      ifResult: str[end] === str[start],
      action: 'Starting position',
      endChanged: false
    });

    while (end < str.length && iteration < maxIterations) {
      iteration++;
      const oldEnd = end;
      
      if (str[end] === str[start]) {
        end++;
      }
      
      const stillInBounds = end < str.length;
      const endChanged = end !== oldEnd;
      
      steps.push({
        iteration,
        end,
        char: stillInBounds ? str[end] : 'END',
        whileCondition: `end(${end}) < ${str.length}`,
        whileResult: stillInBounds,
        ifCondition: oldEnd < str.length ? `str[${oldEnd}]('${str[oldEnd]}') === str[${start}]('${str[start]}')` : 'N/A',
        ifResult: oldEnd < str.length ? str[oldEnd] === str[start] : false,
        action: endChanged ? 'end++ (executed)' : 'end unchanged (if failed)',
        endChanged
      });
    }

    if (iteration >= maxIterations) {
      steps.push({
        iteration: 'STOPPED',
        end,
        char: 'INFINITE LOOP DETECTED',
        whileCondition: 'Stopped after 10 iterations',
        whileResult: false,
        ifCondition: '',
        ifResult: false,
        action: 'Loop would continue forever!',
        endChanged: false
      });
    }

    setVersion2Steps(steps);
  };

  const handleRun = () => {
    setIsRunning(true);
    runVersion1();
    runVersion2();
  };

  const handleReset = () => {
    setVersion1Steps([]);
    setVersion2Steps([]);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Loop Logic Comparison</h1>
        <p className="text-gray-600 mb-6">Understanding the difference between AND condition vs nested IF</p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Test String</label>
              <input
                type="text"
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isRunning}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Position</label>
              <input
                type="number"
                value={startPos}
                onChange={(e) => setStartPos(Math.max(0, Math.min(testString.length - 1, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                max={testString.length - 1}
                disabled={isRunning}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={isRunning ? handleReset : handleRun}
                className={`w-full px-6 py-2 rounded-md font-semibold text-white ${
                  isRunning 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isRunning ? 'Reset' : 'Run Both Versions'}
              </button>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-sm font-mono">
              String: <span className="font-bold">{testString}</span>
            </p>
            <p className="text-sm font-mono">
              Character at start position [{startPos}]: <span className="font-bold text-indigo-600">{testString[startPos]}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Version 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-green-600 mb-2">Version 1 (Correct)</h2>
              <code className="block bg-gray-100 p-3 rounded text-sm">
                while (end &lt; str.length <span className="font-bold text-green-600">&amp;&amp;</span> str[end] === str[start]) {'{'}<br/>
                &nbsp;&nbsp;end++;<br/>
                {'}'}
              </code>
            </div>

            {version1Steps.length > 0 && (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {version1Steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`border-2 rounded-lg p-3 ${
                      step.iteration === 'FINAL'
                        ? 'border-green-500 bg-green-50'
                        : step.continueLoop
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-red-300 bg-red-50'
                    }`}
                  >
                    <div className="font-bold mb-2">
                      {step.iteration === 'FINAL' ? 'Final Result' : `Iteration ${step.iteration}`}
                    </div>
                    <div className="text-sm space-y-1">
                      {step.iteration !== 'FINAL' && (
                        <>
                          <div>end = <span className="font-bold">{step.end}</span>, char = <span className="font-mono font-bold">'{step.char}'</span></div>
                          <div className={step.condition1Result ? 'text-green-600' : 'text-red-600'}>
                            ✓ {step.condition1}: {step.condition1Result ? 'TRUE' : 'FALSE'}
                          </div>
                          <div className={step.condition2Result ? 'text-green-600' : 'text-red-600'}>
                            ✓ {step.condition2}: {step.condition2Result ? 'TRUE' : 'FALSE'}
                          </div>
                          <div className="font-semibold">
                            {step.continueLoop ? '→ Both TRUE: Continue' : '→ At least one FALSE: STOP'}
                          </div>
                        </>
                      )}
                      <div className="text-gray-700 font-medium">{step.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Version 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-red-600 mb-2">Version 2 (Broken)</h2>
              <code className="block bg-gray-100 p-3 rounded text-sm">
                while (end &lt; str.length) {'{'}<br/>
                &nbsp;&nbsp;<span className="font-bold text-red-600">if</span> (str[end] === str[start]) {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;end++;<br/>
                &nbsp;&nbsp;{'}'}<br/>
                {'}'}
              </code>
            </div>

            {version2Steps.length > 0 && (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {version2Steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`border-2 rounded-lg p-3 ${
                      step.iteration === 'STOPPED'
                        ? 'border-red-500 bg-red-100'
                        : step.endChanged
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-yellow-300 bg-yellow-50'
                    }`}
                  >
                    <div className="font-bold mb-2">
                      {step.iteration === 'STOPPED' ? '⚠️ Infinite Loop!' : `Iteration ${step.iteration}`}
                    </div>
                    <div className="text-sm space-y-1">
                      {step.iteration !== 'STOPPED' && (
                        <>
                          <div>end = <span className="font-bold">{step.end}</span>, char = <span className="font-mono font-bold">'{step.char}'</span></div>
                          <div className={step.whileResult ? 'text-green-600' : 'text-red-600'}>
                            While: {step.whileCondition}: {step.whileResult ? 'TRUE' : 'FALSE'}
                          </div>
                          <div className={step.ifResult ? 'text-green-600' : 'text-red-600'}>
                            If: {step.ifCondition}: {step.ifResult ? 'TRUE' : 'FALSE'}
                          </div>
                          {!step.endChanged && step.iteration !== 0 && (
                            <div className="text-yellow-700 font-semibold">
                              ⚠️ end stuck! Loop continues forever!
                            </div>
                          )}
                        </>
                      )}
                      <div className="text-gray-700 font-medium">{step.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Key Differences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
              <h3 className="font-bold text-green-700 mb-2">✓ Version 1: AND Operator (&&)</h3>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Both conditions must be true to continue</li>
                <li>• Stops immediately when characters differ</li>
                <li>• Always terminates correctly</li>
                <li>• Returns accurate group length</li>
              </ul>
            </div>
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
              <h3 className="font-bold text-red-700 mb-2">✗ Version 2: Nested IF</h3>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Only checks bounds in while condition</li>
                <li>• IF doesn't affect loop termination</li>
                <li>• Gets stuck when characters differ</li>
                <li>• Creates infinite loop (end never advances)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}