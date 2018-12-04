const solve = input => {
    const guardTimes = {};
    
    let currentGuardId;
    let currentStart;
    
    input.sort((a, b) => {
        const first = a.substring(a.indexOf('[') + 1, a.indexOf(']'));
        const second = b.substring(b.indexOf('[') + 1, b.indexOf(']'));
        
        if (first > second) {
            return 1;
        } else {
            return -1;
        }
    });
    
    for (const log of input) {
        const parsedLog = parseLog(log);

        switch (parsedLog.type) {
            case 'id':
                currentGuardId = parsedLog.id;
                if (!guardTimes[currentGuardId]) {
                    guardTimes[currentGuardId] = {
                        totalSleepTime: 0,
                        minutes: {}
                    };
                }
                break;
            case 'start':
                currentStart = parsedLog.startTime;
                break;
            case 'stop':
                for (let minute = currentStart; minute < parsedLog.endTime; minute++) {
                    if (!guardTimes[currentGuardId].minutes[minute]) {
                        guardTimes[currentGuardId].minutes[minute] = 1;
                    } else {
                        guardTimes[currentGuardId].minutes[minute]++;
                    }
                }
                guardTimes[currentGuardId].totalSleepTime += parsedLog.endTime - currentStart;
                break;
        }
    }

    // let mostSleep = 0;
    // let guardWithMostSleep;
    // for (let guard in guardTimes) {
    //     if (guardTimes[guard].totalSleepTime > mostSleep) {
    //         guardWithMostSleep = guard;
    //         mostSleep = guardTimes[guard].totalSleepTime;
    //     }
    // }
    // console.log(`Guard with most sleep is guard ${guardWithMostSleep}, with total sleep time of ${mostSleep}`);

    let numberOfOccurence = 0;
    let mostOftenMinute;
    let guardWithMostOccurences;
    for (let guard in guardTimes) {
        for (let minute in guardTimes[guard].minutes) {
            if (guardTimes[guard].minutes[minute] > numberOfOccurence) {
                mostOftenMinute = minute;
                numberOfOccurence = guardTimes[guard].minutes[minute];
                guardWithMostOccurences = guard;
            }
        }
    }
    return `most often minute for ${guardWithMostOccurences} is ${mostOftenMinute}, which he slept during ${numberOfOccurence} times`;
};

const parseLog = log => {
    let id, type, startTime, endTime;
    if (log.includes('Guard')) {
        id = log.slice(log.indexOf('#'), log.indexOf(' ', log.indexOf('#')));
        type = 'id';
    }
    
    if (log.includes('falls asleep')) {
        startTime = log.slice(log.indexOf(':') + 1, log.indexOf(']'));
        type = 'start';
    }
    
    if (log.includes('wakes up')) {
        endTime = log.slice(log.indexOf(':') + 1, log.indexOf(']'));
        type = 'stop';
    }

    return {
        id,
        type,
        startTime,
        endTime
    }
};

/**
 [1518-11-01 00:00] Guard #10 begins shift
 [1518-11-01 00:05] falls asleep
 [1518-11-01 00:25] wakes up
 [1518-11-01 00:30] falls asleep
 [1518-11-01 00:55] wakes up
 [1518-11-01 23:58] Guard #99 begins shift
 [1518-11-02 00:40] falls asleep
 [1518-11-02 00:50] wakes up
 */
module.exports = { solve };
