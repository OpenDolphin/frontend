import { DateTime } from "luxon";
import type { Router } from "vue-router";

export function renderPostDate(date: string): string {
    let relativeTime = DateTime.fromISO(date).toRelative();
    if(relativeTime != null) {
        return relativeTime;
    }

    return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
}

export function viewProfile(router: Router, username: string) {
    router.push(`/profile/${username}`)
}

export function formatNumber(n: number): string {
    if(n == undefined) {
        return '0';
    }
    if(n > 1000) {
        let ks = Math.round(n/100)/10;
        return `${ks}k`;
    }
    return `${n}`;
}