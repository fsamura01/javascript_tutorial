import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function DescendingOrderDemo() {
  const [example, setExample] = useState('mixed');
  
  const examples = {
    mixed: {
      nums1: [2, 7, 11, 15],
      nums2: [1, 10, 20, 4],
      description: "Mixed scenario - one unbeatable value (20)"
    },
    allWinnable: {
      nums1: [2, 7, 11, 15],
      nums2: [1, 10, 4, 11],
      description: "All winnable - both approaches work"
    },
    mostUnwinnable: {
      nums1: [1, 2, 3, 4],
      nums2: [5, 6, 7, 8],
      description: "All unwinnable - order matters for minimizing waste"
    }
  };
  
  const currentExample = examples[example];
  
  // Simulate ascending order processing
  const processAscending = (nums1, nums2) => {
    const sorted1 = [...nums1].sort((a, b) => a - b);
    const indexed2 = nums2.map((val, idx) => [val, idx]).sort((a, b) => a[0] - b[0]);
    
    let left = 0, right = sorted1.length - 1;
    const steps = [];
    const result = new Array(nums2.length);
    
    for (const [target, originalIdx] of indexed2) {
      const canWin = sorted1[left] > target || sorted1[right] > target;
      let chosen;
      
      if (sorted1[right] > target) {
        chosen = sorted1[right];
        result[originalIdx] = chosen;
        right--;
        steps.push({
          target,
          chosen,
          remaining: sorted1.slice(left, right + 1),
          wins: chosen > target,
          reason: canWin ? "Can win, using smallest winner" : "Can't win"
        });
      } else {
        chosen = sorted1[left];
        result[originalIdx] = chosen;
        left++;
        steps.push({
          target,
          chosen,
          remaining: sorted1.slice(left, right + 1),
          wins: chosen > target,
          reason: "Can't win, sacrifice smallest"
        });
      }
    }
    
    return { steps, result, wins: steps.filter(s => s.wins).length };
  };
  
  // Simulate descending order processing
  const processDescending = (nums1, nums2) => {
    const sorted1 = [...nums1].sort((a, b) => a - b);
    const indexed2 = nums2.map((val, idx) => [val, idx]).sort((a, b) => b[0] - a[0]);
    
    let left = 0, right = sorted1.length - 1;
    const steps = [];
    const result = new Array(nums2.length);
    
    for (const [target, originalIdx] of indexed2) {
      let chosen;
      
      if (sorted1[right] > target) {
        chosen = sorted1[right];
        result[originalIdx] = chosen;
        right--;
        steps.push({
          target,
          chosen,
          remaining: sorted1.slice(left, right + 1),
          wins: true,
          reason: "Can win! Use largest available"
        });
      } else {
        chosen = sorted1[left];
        result[originalIdx] = chosen;
        left++;
        steps.push({
          target,
          chosen,
          remaining: sorted1.slice(left, right + 1),
          wins: false,
          reason: "Can't win, sacrifice smallest"
        });
      }
    }
    
    return { steps, result, wins: steps.filter(s => s.wins).length };
  };
  
  const ascending = processAscending(currentExample.nums1, currentExample.nums2);
  const descending = processDescending(currentExample.nums1, currentExample.nums2);
  
  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Why Process in Descending Order?
        </h1>
        <p className="text-gray-600 text-lg">
          Watch how processing order affects which cards we sacrifice
        </p>
      </div>
      
      {/* Example Selector */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Choose Scenario:
        </label>
        <select 
          value={example}
          onChange={(e) => setExample(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="mixed">Mixed (Some Unbeatable)</option>
          <option value="allWinnable">All Winnable</option>
          <option value="mostUnwinnable">All Unbeatable</option>
        </select>
        <p className="text-sm text-gray-600 mt-2">{currentExample.description}</p>
      </div>
      
      {/* Input Display */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Your Cards (nums1)</h3>
          <div className="flex gap-2">
            {currentExample.nums1.map((val, idx) => (
              <div key={idx} className="bg-blue-100 px-4 py-2 rounded font-mono">
                {val}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-2">Opponent's Cards (nums2)</h3>
          <div className="flex gap-2">
            {currentExample.nums2.map((val, idx) => (
              <div key={idx} className="bg-red-100 px-4 py-2 rounded font-mono">
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Comparison */}
      <div className="grid grid-cols-2 gap-6">
        {/* Ascending Order */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <XCircle size={24} />
            Ascending Order (Wrong)
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Process smallest opponents first
          </p>
          
          {ascending.steps.map((step, idx) => (
            <div key={idx} className="mb-4 p-3 bg-gray-50 rounded border-l-4 border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm text-gray-600">vs</span>
                  <span className="ml-2 font-bold text-lg">{step.target}</span>
                </div>
                <ArrowRight className="text-gray-400" size={20} />
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-blue-600">{step.chosen}</span>
                  {step.wins ? 
                    <CheckCircle size={20} className="text-green-500" /> : 
                    <XCircle size={20} className="text-red-500" />
                  }
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Remaining: [{step.remaining.join(', ')}]
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <p className="font-semibold text-red-800">
              Total Wins: {ascending.wins} / {ascending.steps.length}
            </p>
          </div>
        </div>
        
        {/* Descending Order */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
            <CheckCircle size={24} />
            Descending Order (Correct)
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Process largest opponents first
          </p>
          
          {descending.steps.map((step, idx) => (
            <div key={idx} className="mb-4 p-3 bg-gray-50 rounded border-l-4 border-green-400">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm text-gray-600">vs</span>
                  <span className="ml-2 font-bold text-lg">{step.target}</span>
                </div>
                <ArrowRight className="text-gray-400" size={20} />
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-blue-600">{step.chosen}</span>
                  {step.wins ? 
                    <CheckCircle size={20} className="text-green-500" /> : 
                    <XCircle size={20} className="text-red-500" />
                  }
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Remaining: [{step.remaining.join(', ')}]
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="font-semibold text-green-800">
              Total Wins: {descending.wins} / {descending.steps.length}
            </p>
          </div>
        </div>
      </div>
      
      {/* Key Insight */}
      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-yellow-600 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-yellow-900 mb-2">Key Insight</h3>
            <p className="text-yellow-800 mb-2">
              When we process in <strong>descending order</strong>, we handle the hardest opponents first. 
              This forces us to commit our best cards early to winnable battles, and sacrifice our 
              weakest cards on unwinnable ones.
            </p>
            <p className="text-yellow-800">
              Processing in ascending order might waste strong cards on easy opponents, leaving 
              us with weak cards against tough opponents we could have beaten!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}