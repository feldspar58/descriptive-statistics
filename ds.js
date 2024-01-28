class DescriptiveStatistics {
    constructor(data) {
      this.data = data;
    }
  
    mean() {
      const sum = this.data.reduce((acc, val) => acc + val, 0);
      return sum / this.data.length;
    }
  
    median() {
      const sortedData = this.data.slice().sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedData.length / 2);
  
      if (sortedData.length % 2 === 0) {
        return (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
      } else {
        return sortedData[middleIndex];
      }
    }
  
    mode() {
      const frequencyMap = new Map();
      this.data.forEach((value) => {
        frequencyMap.set(value, (frequencyMap.get(value) || 0) + 1);
      });
  
      let mode;
      let maxFrequency = 0;
  
      for (const [value, frequency] of frequencyMap) {
        if (frequency > maxFrequency) {
          maxFrequency = frequency;
          mode = value;
        }
      }
  
      return mode;
    }
  
    
    range() {
      const sortedData = this.data.slice().sort((a, b) => a - b);
      return sortedData[sortedData.length - 1] - sortedData[0];
    }
  
    variance() {
      const meanValue = this.mean();
      const squaredDifferences = this.data.map((value) => (value - meanValue) ** 2);
      return squaredDifferences.reduce((acc, val) => acc + val, 0) / this.data.length;
    }
  
    standardDeviation() {
      return Math.sqrt(this.variance());
    }
  
    quartiles() {
      const sortedData = this.data.slice().sort((a, b) => a - b);
      const midIndex = Math.floor(sortedData.length / 2);
  
      const lowerHalf = sortedData.slice(0, midIndex);
      const upperHalf = sortedData.slice(midIndex + (sortedData.length % 2 === 0 ? 0 : 1));
  
      return {
        Q1: this.median(lowerHalf),
        Q2: this.median(sortedData),
        Q3: this.median(upperHalf),
      };
    }
  
    interquartileRange() {
      const { Q1, Q3 } = this.quartiles();
      return Q3 - Q1;
    }
  }
  
  const data = [5, 8, 2, 10, 8, 3, 7, 6, 4, 1];
  const stats = new DescriptiveStatistics(data);
  
  console.log("Mean:", stats.mean());
  console.log("Median:", stats.median());
  console.log("Mode:", stats.mode());
  console.log("Range:", stats.range());
  console.log("Variance:", stats.variance());
  console.log("Standard Deviation:", stats.standardDeviation());
  console.log("Quartiles:", stats.quartiles());
  console.log("Interquartile Range:", stats.interquartileRange());
  