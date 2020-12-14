import * as Phaser from 'phaser';

import Button   from '../objects/button';
import InfoText from '../objects/info-text';

import CONFIG from '../config';

import { fetchScores, Score } from '../api';

class Leaderboard extends Phaser.Scene {
    private infoH3 ?: InfoText;

    constructor() {
        super('Leaderboard');
    }

    create() {
        const { width, height } = this.cameras.main;
        const halfWidth = width / 2, halfHeight = height / 2;

        this.add
            .text(halfWidth, halfHeight - 300, 'LEADERBOARD', { ...CONFIG.defaultFontStyle, fontSize: '40px' })
            .setOrigin(0.5, 0.5);

        this.add
            .image(halfWidth, halfHeight, 'background')
            .setScale(1.5, 1.5)
            .setDepth(-4);


        this.infoH3 = new InfoText(this, halfWidth, halfHeight, 'h3');
        this.infoH3.setContent('Loading...');

        this.loadScores();

        new Button(this, halfWidth, halfHeight + 300, {
            inactiveTexture: 'button_pink',
            activeTexture: 'button_green',
            content: 'Main Menu',
            onClick: () => {
                this.scene.start('Title');
            }
        });
    }

    private async loadScores(): Promise<void> {
        const { success, result } = await fetchScores();
        if (success && result) {
            const scores = result.result;
            scores.sort((a, b) => b.score - a.score);
            this.renderScoresTable(scores);
            this.infoH3!.destroy();
        } else {
            this.infoH3!.setContent('Something happened. Please try again later', 'red');
        }
    }

    private renderScoresTable(scores: Score[]): void {
        const { width, height } = this.cameras.main;
        const halfWidth = width / 2, halfHeight = height / 2;

        const table = document.createElement('table');
        table.classList.add('leaderboard');

        const headings = document.createElement('tr');
        headings.appendChild(this.createElement('th', 'RANK'));
        headings.appendChild(this.createElement('th', 'SCORE'));
        headings.appendChild(this.createElement('th', 'NAME'));
        table.appendChild(headings);

        const rank = document.createElement('td');
        rank.innerHTML

        for (let i = 0; i < 10; i += 1) {
            const tr = document.createElement('tr');
            table.appendChild(tr);

            tr.appendChild(this.createElement('td', i + 1));
            tr.appendChild(this.createElement('td', scores[i].score));
            tr.appendChild(this.createElement('td', scores[i].user));
        }

        this.add.dom(halfWidth, halfHeight, table);
    }

    private createElement(tag: string, content: string | number) {
        const elem = document.createElement(tag);
        elem.innerHTML = content.toString();
        return elem;
    }
}

export default Leaderboard;
