// Animations
export default {
  enter_left: [
    { transform: 'translateX(calc(calc(1vw + 1vh) * 2))', opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 }
  ],
  enter_right: [
    { transform: 'translateX(calc(calc(1vw + 1vh) * -2))', opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 }
  ],
  enter_up: [
    { transform: 'translateY(calc(calc(1vw + 1vh) * 2))', opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 }
  ],
  enter_down: [
    { transform: 'translateY(calc(calc(1vw + 1vh) * -2))', opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 }
  ],

  leave_left: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: 'translateX(calc(calc(1vw + 1vh) * -2))', opacity: 0 }
  ],
  leave_right: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: 'translateX(calc(calc(1vw + 1vh) * 2))', opacity: 0 }
  ],
  leave_up: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: 'translateY(calc(calc(1vw + 1vh) * -2))', opacity: 0 }
  ],
  leave_down: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: 'translateY(calc(calc(1vw + 1vh) * 2))', opacity: 0 }
  ]
}
