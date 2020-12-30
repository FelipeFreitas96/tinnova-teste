class Votes {
    totalVoters = 1000;
    votesValid = 800;
    votesBlank = 150;
    votesNull = 50;

    formatPercent(numb) {
        return (numb * 100) + '%';
    }

    getValidVotesPercent() {
        return this.formatPercent(this.votesValid / this.totalVoters);
    }

    getBlankVotesPercent() {
        return this.formatPercent(this.votesBlank / this.totalVoters);
    }

    getNullVotesPercent() {
        return this.formatPercent(this.votesNull / this.totalVoters);
    }
}

const votes = new Votes();
const validVotesPercent = votes.getValidVotesPercent();
console.log(`Percentual de votos válidos: ${validVotesPercent}.`);

const blankVotesPercent = votes.getBlankVotesPercent();
console.log(`Percentual de votos em branco: ${blankVotesPercent}.`);

const nullVotesPercent = votes.getNullVotesPercent();
console.log(`Percentual de votos nulo: ${nullVotesPercent}.`);