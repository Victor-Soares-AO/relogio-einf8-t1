"use client"

import { useEffect, useState } from "react";
import { toZonedTime, format as formatTz } from "date-fns-tz";
import { ptBR } from 'date-fns/locale/pt-BR';
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {

    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const updateTime = () => {
            const now = new Date();
            const zonedDate = toZonedTime(now, timeZone);

            const formattedTime = formatTz(zonedDate, 'HH:mm:ss', { timeZone });
            const formattedDate = formatTz(zonedDate, "EEEE, dd MMMM yyyy", { timeZone, locale: ptBR });

            setTime(formattedTime);
            setDate(formattedDate);
        }

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval)
    }, []);

    return (
        <main className="flex flex-col min-h-screen bg-red-500 dark:bg-zinc-950 items-center">
            <div className="w-1/2">
                <nav className="flex items-center justify-between border-b py-4">
                    <h1 className="text-white font-semibold text-xl">
                        Relogio.ao
                    </h1>

                    <ModeToggle />
                </nav>

                <div className="flex flex-col justify-center gap-5 mt-8 py-8 rounded-md items-center text-white dark:text-white bg-white/10">
                    <p className="text-xl font-semibold">
                        Hora certa
                    </p>

                    <p className="text-8xl font-semibold">
                        {time}
                    </p>

                    <p className="text-2xl font-semibold">
                        {date}
                    </p>
                </div>

            </div>
        </main>
    );
}