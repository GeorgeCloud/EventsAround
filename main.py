long_message = "The car is red. The house is underwater and is green. I love going to the park🍓."
#
# We want to send this message to a friend but the text limit for snapchat only
# allows for a max count of 25 characters(including punctuation). Create a
# function that returns the longest possible message without leaving a sentence half way.


last_period = None

def send_message_max_50(long_message):
    for idx, c in enumerate(long_message):
        if idx <= 50:
            if c == '.':
                last_period = idx

    return long_message[:last_period+1]

print(send_message_max_50(long_message))
