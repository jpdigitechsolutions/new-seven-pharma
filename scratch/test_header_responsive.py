# scratch/test_header_responsive.py
def check_header_fit(screen_width):
    padding = 24  # px-3 (12px * 2)
    logo_icon = 36  # w-9
    logo_gap = 8   # gap-2
    # "NEW SEVEN PHARMA" at text-sm (14px font-black)
    logo_text = 125 
    total_logo = logo_icon + logo_gap + logo_text
    
    flex_gap = 8   # gap-2
    
    cart_btn = 36  # w-9 h-9
    action_gap = 6 # gap-1.5
    hamburger_btn = 36 # w-9 h-9
    total_actions = cart_btn + action_gap + hamburger_btn
    
    total_needed = padding + total_logo + flex_gap + total_actions
    margin_right = screen_width - total_needed
    
    print(f"Screen: {screen_width}px | Needed: {total_needed}px | Spare Space: {margin_right}px | Fits: {total_needed <= screen_width}")
    return total_needed <= screen_width

screens = [320, 360, 375, 390, 412, 430]
all_fit = all(check_header_fit(s) for s in screens)
print(f"All mobile viewports fit comfortably: {all_fit}")

