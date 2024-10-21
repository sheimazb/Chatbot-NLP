import openai

# Set your OpenAI API key
openai.api_key = "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"  # Replace with your actual API key

def call_openai_api(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # You can use "gpt-4" if you have access
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=150  # Adjust based on your needs
        )
        return response['choices'][0]['message']['content']
    except Exception as e:
        return f"Error: {str(e)}"