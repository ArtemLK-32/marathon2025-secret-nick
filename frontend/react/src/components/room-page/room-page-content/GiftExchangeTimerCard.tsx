import { useEffect, useState } from "react";

const STORAGE_KEY = "santa_exchange_time";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const GiftExchangeTimerCard = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // читаем дату, которую пользователь задал в timer.html
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return;
    }

    const date = new Date(saved);
    if (isNaN(date.getTime())) {
      return;
    }

    setTargetDate(date);

    const update = () => {
      const now = new Date();
      const diff = date.getTime() - now.getTime();

      if (diff <= 0) {
        setIsFinished(true);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
      setIsFinished(false);
    };

    update();
    const id = window.setInterval(update, 1000);

    return () => window.clearInterval(id);
  }, []);

  // если таймер ещё ни разу не настраивали
  if (!targetDate || !timeLeft) {
    return (
      <div
        style={{
          marginTop: "16px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "16px 18px",
          boxShadow: "0 10px 30px rgba(14, 36, 56, 0.08)",
        }}
      >
        <h3
          style={{
            margin: 0,
            marginBottom: "6px",
            fontSize: "16px",
            fontWeight: 600,
            color: "#13324b",
          }}
        >
          Gift exchange timer
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#556678",
          }}
        >
          Timer is not set yet. Click “Open gift exchange timer” on the form to
          choose date and time.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "16px",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "16px 18px",
        boxShadow: "0 10px 30px rgba(14, 36, 56, 0.08)",
      }}
    >
      <h3
        style={{
          margin: 0,
          marginBottom: "6px",
          fontSize: "16px",
          fontWeight: 600,
          color: "#13324b",
        }}
      >
        Time left until the gift exchange
      </h3>

      <p
        style={{
          margin: 0,
          marginBottom: "10px",
          fontSize: "12px",
          color: "#6a7a8d",
        }}
      >
        Based on the date and time set in the gift exchange timer.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "8px",
          marginBottom: "6px",
        }}
      >
        {[
          { label: "days", value: timeLeft.days },
          { label: "hours", value: timeLeft.hours },
          { label: "minutes", value: timeLeft.minutes },
          { label: "seconds", value: timeLeft.seconds },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: "#f5f8ff",
              borderRadius: "12px",
              padding: "8px 4px",
              textAlign: "center",
              border: "1px solid #e0e7f5",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#13253f",
              }}
            >
              {String(item.value).padStart(2, "0")}
            </div>
            <div
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#6a7992",
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {isFinished ? (
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            fontWeight: 600,
            color: "#137b4b",
          }}
        >
          The time has come! It&apos;s time to exchange gifts 🎁
        </p>
      ) : (
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "#556678",
          }}
        >
          Don&apos;t forget to prepare your gift on time!
        </p>
      )}
    </div>
  );
};

export default GiftExchangeTimerCard;
