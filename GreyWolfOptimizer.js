// GreyWolfOptimization.js
import { performanceFunction } from './fitness.js';

export class GreyWolfOptimizer {
    constructor(populationSize, maxIterations, numComponents) {
        this.populationSize = populationSize;
        this.maxIterations = maxIterations;
        this.numComponents = numComponents;
        this.alpha = null;
        this.beta = null;
        this.delta = null;
        this.population = [];
        this.bestFitness = -Infinity;  // Track the best fitness value across Alpha, Beta, Delta
    }

    initializePopulation() {
        for (let i = 0; i < this.populationSize; i++) {
            const individual = Array.from({ length: this.numComponents }, () =>
                Math.floor(Math.random() * 3)
            ); // Random index for each component
            this.population.push(individual);
        }
    }

    evaluateFitness() {
        this.population.sort((a, b) => {
            return (
                performanceFunction(...b) - performanceFunction(...a)
            );
        });

        this.alpha = this.population[0];
        this.beta = this.population[1] || this.alpha;
        this.delta = this.population[2] || this.alpha;

        // Track the best fitness across Alpha, Beta, and Delta
        const alphaFitness = performanceFunction(...this.alpha);
        const betaFitness = performanceFunction(...this.beta);
        const deltaFitness = performanceFunction(...this.delta);

        // Find the highest fitness value and update the global best fitness
        const highestFitness = Math.max(alphaFitness, betaFitness, deltaFitness);
        this.bestFitness = Math.max(this.bestFitness, highestFitness);
    }

    updatePosition(individual, iteration, maxIterations) {
        const a = 2 - (2 * iteration) / maxIterations;
        const updatedIndividual = individual.map((pos, index) => {
            const r1 = Math.random();
            const r2 = Math.random();

            const A1 = a * (2 * r1 - 1);
            const C1 = 2 * r2;

            const D_alpha = Math.abs(C1 * this.alpha[index] - pos);
            const X1 = this.alpha[index] - A1 * D_alpha;

            const r3 = Math.random();
            const r4 = Math.random();

            const A2 = a * (2 * r3 - 1);
            const C2 = 2 * r4;

            const D_beta = Math.abs(C2 * this.beta[index] - pos);
            const X2 = this.beta[index] - A2 * D_beta;

            const r5 = Math.random();
            const r6 = Math.random();

            const A3 = a * (2 * r5 - 1);
            const C3 = 2 * r6;

            const D_delta = Math.abs(C3 * this.delta[index] - pos);
            const X3 = this.delta[index] - A3 * D_delta;

            const newPosition = (X1 + X2 + X3) / 3;
            return Math.min(Math.max(Math.round(newPosition), 0), 2);
        });

        return updatedIndividual;
    }

    // optimize() {
    //     this.initializePopulation();
    //     this.evaluateFitness();

    //     for (let iteration = 0; iteration < this.maxIterations; iteration++) {
    //         this.population = this.population.map((individual) => {
    //             return this.updatePosition(individual, iteration, this.maxIterations);
    //         });
    //         this.evaluateFitness();
    //     }

    //     console.log('Best solution found:', this.alpha);
    //     console.log('Highest fitness value from Alpha, Beta, and Delta:', this.bestFitness);
    // }
}
