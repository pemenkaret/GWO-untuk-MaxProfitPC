// fitness.js
export function performanceFunction(prosesorIndex, gpuIndex, ramIndex, storageIndex) {
    const components = {
        processors: [
            { name: "Intel Core i7", price: 5000000, performance: 85 },
            { name: "Intel Core i5", price: 4000000, performance: 75 },
            { name: "AMD Ryzen 5", price: 3500000, performance: 70 }
        ],
        gpus: [
            { name: "NVIDIA RTX 3060", price: 6000000, performance: 90 },
            { name: "NVIDIA RTX 1660", price: 4500000, performance: 70 },
            { name: "AMD Radeon RX 570", price: 3500000, performance: 60 }
        ],
        ram: [
            { name: "32 GB", price: 2500000, performance: 80 },
            { name: "16 GB", price: 1500000, performance: 60 },
            { name: "8 GB", price: 1000000, performance: 40 }
        ],
        storage: [
            { name: "SSD 1TB", price: 3500000, performance: 90 },
            { name: "SSD 512 GB", price: 2000000, performance: 70 },
            { name: "HDD 1TB", price: 1000000, performance: 40 }
        ]
    };

    // Fetch the selected components
    const proc = components.processors[prosesorIndex] || { name: 'Unknown', price: 0, performance: 0 };
    const gpu = components.gpus[gpuIndex] || { name: 'Unknown', price: 0, performance: 0 };
    const ram = components.ram[ramIndex] || { name: 'Unknown', price: 0, performance: 0 };
    const storage = components.storage[storageIndex] || { name: 'Unknown', price: 0, performance: 0 };

    // Calculate total cost and performance
    const totalCost = proc.price + gpu.price + ram.price + storage.price;
    const totalPerformance = proc.performance + gpu.performance + ram.performance + storage.performance;

    // Budget limit
    const BUDGET = 15000000;

    // Penalize solutions that exceed the budget
    if (totalCost > BUDGET) {
        console.log("Overbudget");
        return -Infinity; // Return a very low value to make this solution invalid
    }

    console.log(`Selected Components:`);
    console.log(`Processor: ${proc.name}, Price: ${proc.price}, Performance: ${proc.performance}`);
    console.log(`GPU: ${gpu.name}, Price: ${gpu.price}, Performance: ${gpu.performance}`);
    console.log(`RAM: ${ram.name}, Price: ${ram.price}, Performance: ${ram.performance}`);
    console.log(`Storage: ${storage.name}, Price: ${storage.price}, Performance: ${storage.performance}`);
    console.log(`Total Cost: ${totalCost}`);
    console.log(`Total Performance: ${totalPerformance}`);

    // Return the performance if it's within budget, else a fitness value
    return totalPerformance;
}
